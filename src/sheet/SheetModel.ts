var math = require('mathjs');
import Cache from '../core/Cache';

export class Sheet {
  constructor(source: any) {
    if (!source) {
      return;
    }
    this.name = source.name || '';
    this.statistics = source.statistics ? source.statistics.map((s: any) => new Statistic(s)) : [];
    this.abilities = source.abilities ? source.abilities.map((s: any) => new  Ability(s)) : [];
    this.inventory = source.inventory ? source.inventory.map((s: any) => new  Item(s)) : [];
    this.conditions = source.conditions ? source.conditions.map((s: any) => new  Condition(s)) : [];
    this.resources = source.resources ? source.resources.map((s: any) => new  Resource(s)) : [];
    this.logs = source.logs ? source.logs.map((s: any) => new  Log(s)) : [];
  }

  name: string = '';
  statistics: Statistic[] = [];
  abilities: Ability[] = [];
  inventory: Item[] = [];
  conditions: Condition[] = [];
  resources: Resource[] = [];
  logs: Log[] = [];

  get actions(): Action[] {
    return this.abilities
      .map(ability => this.getActionsFromAbility(ability))
      .reduce((acc, cur) => acc.concat(cur));
  }

  get resolvedResources(): ResolvedResource[] {
    var cache = new Cache<ResolvedStatistic>();

    return this.resources.map(r => this.resolveResource(cache, r));
  }

  get resolvedStatistics(): ResolvedStatistic[] {
    // use lookup cache so we only calculate each statistic once, even if multiple statistics refer to them
    var cache = new Cache<ResolvedStatistic>();

    return this.statistics.map(statistic => this.innerResolveStatistic(cache, statistic));
  }

  findStatistic(statisticName: string): Statistic | undefined {
    return this.statistics.find(s => s.name === statisticName);
  }

  resolveStatistic(statisticName: string): ResolvedStatistic | undefined {
    var statistic = this.findStatistic(statisticName);
    return statistic ? this.innerResolveStatistic(new Cache<ResolvedStatistic>(), statistic) : statistic;
  }

  previewFormulaValue(formula: string) {
    var cache = new Cache<ResolvedStatistic>();

    return this.innerCalculateFormula(cache, formula);
  }

  private getActionsFromAbility(ability: Ability) : Action[] {
    return ability.actions.map(a => {
      var action = new Action();
      action.name = ability.name;
      action.cost = a;
      return action;
    });
  }

  private resolveResource(cache: Cache<ResolvedStatistic>, r: Resource): ResolvedResource {
    var resource = new ResolvedResource(r);

    resource.formula = r.formula;
    resource.current = r.current;
    resource.name = r.name;
    resource.value = this.innerCalculateFormula(cache, r.formula);

    return resource;
  }

  private statisticIsBase(statistic: Statistic) {
    return !isNaN(Number(statistic.formula));
  }

  private innerResolveStatistic(cache: Cache<ResolvedStatistic>, statistic: Statistic): ResolvedStatistic {
    return cache.getFromCache(statistic.name, key => {

      const value = this.innerCalculateFormula(cache, statistic.formula);
      const modified = this.conditionalModifier(cache, statistic);
      const conditional = this.isConditional(statistic);
      const base = this.statisticIsBase(statistic);

      var resolvedStatistic = new ResolvedStatistic(statistic);

      resolvedStatistic.value = value + modified;
      resolvedStatistic.name = key;
      resolvedStatistic.formula = statistic.formula;
      resolvedStatistic.conditional = conditional;
      resolvedStatistic.base = base;

      return resolvedStatistic;
    });
  }

  private effectsTargetingStatistic(statistic: Statistic): Effect[] {
    return this.conditions
      .map(c => c.effects)
      .reduce((acc, cur) => acc.concat(cur))
      .filter(c => c.target === statistic.name);
  }

  private isConditional(statistic: Statistic): boolean {
    return this.effectsTargetingStatistic(statistic).length > 0;
  }

  private conditionalModifier(cache: Cache<ResolvedStatistic>, statistic: Statistic): number {
    return this.effectsTargetingStatistic(statistic)
      .map(c => this.innerCalculateFormula(cache, c.formula))
      .reduce((acc, cur) => acc + cur);
  }

  private innerCalculateFormula(cache: Cache<ResolvedStatistic>, formula: string): number {
    const regex = /\[[a-zA-z ]+\]/g;
    const matches = formula.match(regex) || [];

    let expression = formula;

    matches.forEach(m => {
      const statisticName = m.replace('[', '').replace(']', '');
      const statistic = this.findStatistic(statisticName);
      var statisticValue = statistic ? this.innerResolveStatistic(cache, statistic) : NaN;

      expression = expression.replace(m, statisticValue.toString());
    });

    try {
      const final = math.eval(expression);
      return Math.floor(final);
    } catch {
      return NaN;
    }
  }
}

export class Effect {
  constructor(source: any) {
    if (!source) {
      return;
    }

    this.target = source.target || '';
    this.formula = source.formula || '0';
  }

  target: string = '';
  formula: string = '0';
}

export class Condition {
  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.effects = source.effects ? source.effects.map((s: any) => new  Effect(s)) : [];
    this.active = source.active || false;
  }

  name: string = '';
  effects: Effect[] = [];
  active: boolean = false;
}

export class Item {
  constructor (source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.description = source.description || '';
    this.stock = source.stock || 0;
  }

  name: string = '';
  description: string = '';
  stock: number = 0;
}

export class Ability {
  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.source = source.source || '';
    this.description = source.description || '';
    this.actions = source.actions ? source.actions : [];
  }

  name: string = '';
  source: string = '';
  description: string = '';
  actions: string[] = [];
}

export class Action {
  name: string = '';
  cost: string = '';
}

export class Statistic {
  constructor (source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.formula = source.formula || '0';
  }

  name: string = '';
  formula: string = '0';
}

export class Resource {
  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.current = source.current || 0;
    this.formula = source.formula || '0';
  }

  name: string = '';
  current: number = 0;
  formula: string = '0';
}

export class Log {
  constructor(source: any) {
    if (!source) {
      return;
    }

    this.timestamp = source.timestamp || '';
    this.text = source.text || '';
  }

  timestamp: string = '';
  text: string = '';
}

export class ResolvedStatistic extends Statistic {
  conditional: boolean = false;
  base: boolean = false;
  value: number = 0;
}

export class ResolvedResource extends Resource {
  value: number = 0;
}

export default Sheet;