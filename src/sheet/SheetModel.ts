var math = require('mathjs');
import Cache from '../core/Cache';

/* tslint:disable no-any */

export class Effect {
  target: string = '';
  formula: string = '0';

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.target = source.target || '';
    this.formula = source.formula || '0';
  }
}

export class Condition {
  name: string = '';
  effects: Effect[] = [];
  active: boolean = false;

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.active = source.active || false;

    if (source instanceof Condition) {
      this.effects = source.effects;
    } else {
      this.effects = source.effects ? source.effects.map((s: any) => new Effect(s)) : [];
    }
  }
}

export class Item {
  name: string = '';
  description: string = '';
  stock: number = 0;

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.description = source.description || '';
    this.stock = source.stock || 0;
  }
}

export class Ability {
  name: string = '';
  source: string = '';
  description: string = '';
  actions: string[] = [];

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.source = source.source || '';
    this.description = source.description || '';
    this.actions = source.actions ? source.actions : [];
  }
}

export class Action {
  name: string = '';
  cost: string = '';
}

export class Statistic {
  name: string = '';
  formula: string = '0';

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.formula = source.formula || '0';
  }

  updateFormula(formula: string): Statistic {
    var updatedStatistic = new Statistic(this);
    updatedStatistic.formula = formula;
    return updatedStatistic;
  }
}

export class Resource {
  name: string = '';
  current: number = 0;
  formula: string = '0';

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.current = source.current || 0;
    this.formula = source.formula || '0';
  }
}

export class Log {
  timestamp: string = '';
  text: string = '';

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.timestamp = source.timestamp || '';
    this.text = source.text || '';
  }
}

export class ResolvedStatistic extends Statistic {
  conditional: boolean = false;
  base: boolean = false;
  value: number = 0;
}

export class ResolvedResource extends Resource {
  value: number = 0;
}

export class Sheet {
  // fields

  name: string = '';
  statistics: Statistic[] = [];
  abilities: Ability[] = [];
  inventory: Item[] = [];
  conditions: Condition[] = [];
  resources: Resource[] = [];
  logs: Log[] = [];

  constructor(source: any) {
    if (!source) {
      return;
    }
    this.name = source.name || '';

    if (source instanceof Sheet) {
      this.statistics = source.statistics;
      this.abilities = source.abilities;
      this.inventory = source.inventory;
      this.conditions = source.conditions;
      this.resources = source.resources;
      this.logs = source.logs;
    } else {
      this.statistics = source.statistics ? source.statistics.map((s: any) => new Statistic(s)) : [];
      this.abilities = source.abilities ? source.abilities.map((s: any) => new Ability(s)) : [];
      this.inventory = source.inventory ? source.inventory.map((s: any) => new Item(s)) : [];
      this.conditions = source.conditions ? source.conditions.map((s: any) => new Condition(s)) : [];
      this.resources = source.resources ? source.resources.map((s: any) => new Resource(s)) : [];
      this.logs = source.logs ? source.logs.map((s: any) => new Log(s)) : [];
    }
  }

  // state transitions

  updateStatisticByIndex(index: number, statistic: Statistic): Sheet {
    var newSheet = new Sheet(this);
    newSheet.statistics = [...this.statistics];
    newSheet.statistics[index] = statistic;
    return newSheet;
  }

  updateStatistic(statistic: Statistic): Sheet {
    var index = this.statistics.findIndex(f => f.name === statistic.name);
    return this.updateStatisticByIndex(index, statistic);
  }

  updateItemByIndex(index: number, item: Item): Sheet {
    var newSheet = new Sheet(this);
    newSheet.inventory = [...this.inventory];
    newSheet.inventory[index] = item;
    return newSheet;
  }

  updateItem(item: Item): Sheet {
    var index = this.inventory.findIndex(f => f.name === item.name);
    return this.updateItemByIndex(index, item);
  }

  rename(newName: string): Sheet {
    var newSheet = new Sheet(this);
    newSheet.name = newName;
    return newSheet;
  }

  addItem(item: Item): Sheet {
    var newSheet = new Sheet(this);
    newSheet.inventory = [...newSheet.inventory, item];
    return newSheet;
  }

  addStatistic(statistic: Statistic): Sheet {
    var newSheet = new Sheet(this);
    newSheet.statistics = [...newSheet.statistics, statistic];
    return newSheet;
  }

  deleteItem(name: string) {
    var newSheet = new Sheet(this);
    newSheet.inventory = [...newSheet.inventory.filter(i => i.name !== name)];
    return newSheet;
  }

  deleteStatistic(name: string) {
    var newSheet = new Sheet(this);
    newSheet.statistics = [...newSheet.statistics.filter(i => i.name !== name)];
    return newSheet;
  }

  activateCondition(conditionName: string): Sheet {
    return this.setConditionActive(conditionName, true);
  }

  inactivateCondition(conditionName: string): Sheet {
    return this.setConditionActive(conditionName, false);
  }

  // creators

  createCandidateStatistic(): Statistic {
    var candidateName = 'New Statistic';

    if (this.statisticExists(candidateName)) {
      let append = 0;
      let incrementName = candidateName + ' ' + append;
      while (this.statisticExists(incrementName)) {
        append++;
        incrementName = candidateName + ' ' + append;
      }
      candidateName = incrementName;
    }

    return new Statistic({ name: candidateName });
  }

  // views / calculated

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
    return this.statistics.find(s => s.name.toLowerCase() === statisticName.toLowerCase());
  }

  resolveStatistic(statisticName: string): ResolvedStatistic | undefined {
    var statistic = this.findStatistic(statisticName);
    return statistic ? this.innerResolveStatistic(new Cache<ResolvedStatistic>(), statistic) : statistic;
  }

  previewFormulaValue(formula: string) {
    var cache = new Cache<ResolvedStatistic>();

    return this.innerCalculateFormula(cache, formula);
  }

  // private methods

  private statisticExists(name: string): boolean {
    return this.findStatistic(name)
      ? true : false;
  }

  private setConditionActive(conditionName: string, active: boolean): Sheet {
    const index = this.conditions.findIndex(c => c.name === conditionName);
    const oldCondition = this.conditions[index];
    if (oldCondition.active === active) {
      return this;
    }

    const newSheet = new Sheet(this);
    newSheet.conditions = [...newSheet.conditions];
    const newCondition = new Condition(oldCondition);
    newCondition.active = active;

    newSheet.conditions[index] = newCondition;

    return newSheet;
  }

  private getActionsFromAbility(ability: Ability): Action[] {
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

  private effectsTargetingStatistic(statistic: Statistic, force: boolean = false): Effect[] {
    return this.conditions
      .filter(c => c.active || force)
      .map(c => c.effects)
      .reduce((acc, cur) => acc.concat(cur), [])
      .filter(c => c.target === statistic.name);
  }

  private isConditional(statistic: Statistic): boolean {
    return this.effectsTargetingStatistic(statistic, true).length > 0;
  }

  private conditionalModifier(cache: Cache<ResolvedStatistic>, statistic: Statistic): number {
    return this.effectsTargetingStatistic(statistic)
      .map(c => this.innerCalculateFormula(cache, c.formula))
      .reduce((acc, cur) => acc + cur, 0);
  }

  private innerCalculateFormula(cache: Cache<ResolvedStatistic>, formula: string): number {
    const regex = /\[[a-zA-z ]+\]/g;
    const matches = formula.match(regex) || [];

    let expression = formula;

    matches.forEach(m => {
      const statisticName = m.replace('[', '').replace(']', '');
      const statistic = this.findStatistic(statisticName);
      var statisticValue = statistic ? this.innerResolveStatistic(cache, statistic).value : NaN;

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

export default Sheet;