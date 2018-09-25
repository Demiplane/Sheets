const math = require('mathjs');
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
    const updatedStatistic = new Statistic(this);
    updatedStatistic.formula = formula;
    return updatedStatistic;
  }

  updateName(name: string): Statistic {
    const updatedStatistic = new Statistic(this);
    updatedStatistic.name = name;
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

  updateName(name: string) {
    const newResource = new Resource(this);
    newResource.name = name;
    return newResource;
  }

  updateFormula(formula: string) {
    const newResource = new Resource(this);
    newResource.formula = formula;
    return newResource;
  }
}

export class Log {
  timestamp: string = '';
  text: string = '';

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.timestamp = source.timestamp || new Date().toLocaleString();
    this.text = source.text || '';
  }

  updateText(text: string): Log {
    const newLog = new Log(this);
    newLog.text = text;
    return newLog;
  }
}

export class ResolvedStatistic extends Statistic {
  conditional: boolean = false;
  base: boolean = false;
  value: number = 0;
}

export class ResolvedResource extends Resource {
  value: number = 0;
  
  updateCurrent(current: number) {
    const newResource = new Resource(this);
    newResource.current = current > this.value ? this.value : current;
    return newResource;
  }
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

  addLog(log: Log): Sheet {
    const newSheet = new Sheet(this);
    newSheet.logs = [...this.logs, log];
    return newSheet;
  }

  deleteLog(log: Log): Sheet {
    const newSheet = new Sheet(this);
    newSheet.logs = this.logs.filter(l => l.timestamp === log.timestamp);
    return newSheet;
  }

  updateLog(log: Log): Sheet {
    const newSheet = new Sheet(this);
    newSheet.logs = [...this.logs];
    const index = this.logs.findIndex(l => l.timestamp === log.timestamp);
    newSheet.logs[index] = log;
    return newSheet;
  }

  updateStatistic(index: number, statistic: Statistic): Sheet {

    const newSheet = new Sheet(this);
    newSheet.statistics = [...this.statistics];
    newSheet.statistics[index] = statistic;

    const oldName = this.statistics[index].name;
    const newName = statistic.name;

    if (oldName !== newName) {
      const target = '[' + oldName + ']';
      const newTarget = '[' + newName + ']';

      newSheet.statistics.forEach((s, i) => {

        if (s.formula.indexOf(target) >= 0) {
          const newStatistic = new Statistic(s);
          newStatistic.formula = s.formula.replace(target, newTarget);
          newSheet.statistics[i] = newStatistic;
        }
      });

      const resourcesToUpdate = newSheet.resources
        .map((resource, resourceIndex) => ({ resource, resourceIndex }))
        .filter(d => d.resource.formula.indexOf(target) >= 0);

      if (resourcesToUpdate.length) {
        newSheet.resources = [...this.resources];

        for (var rp of resourcesToUpdate) {
          const newResource = new Resource(rp.resource);
          newResource.formula = newResource.formula.replace(target, newTarget);
          newSheet.resources[rp.resourceIndex] = newResource;
        }
      }
    }

    return newSheet;
  }

  updateItem(index: number, item: Item): Sheet {
    const newSheet = new Sheet(this);
    newSheet.inventory = [...this.inventory];
    newSheet.inventory[index] = item;
    return newSheet;
  }

  rename(newName: string): Sheet {
    const newSheet = new Sheet(this);
    newSheet.name = newName;
    return newSheet;
  }

  addItem(item: Item): Sheet {
    const newSheet = new Sheet(this);
    newSheet.inventory = [...newSheet.inventory, item];
    return newSheet;
  }

  addStatistic(statistic: Statistic): Sheet {
    const newSheet = new Sheet(this);
    newSheet.statistics = [...newSheet.statistics, statistic];
    return newSheet;
  }

  deleteItem(item: Item) {
    const newSheet = new Sheet(this);
    newSheet.inventory = [...newSheet.inventory.filter(i => i.name !== item.name)];
    return newSheet;
  }

  deleteStatistic(statistic: Statistic) {
    const newSheet = new Sheet(this);
    newSheet.statistics = [...newSheet.statistics.filter(i => i.name !== statistic.name)];
    return newSheet;
  }

  activateCondition(condition: Condition): Sheet {
    return this.setConditionActive(condition.name, true);
  }

  inactivateCondition(condition: Condition): Sheet {
    return this.setConditionActive(condition.name, false);
  }

  updateResource(index: number, resource: Resource) {
    const newSheet = new Sheet(this);
    newSheet.resources = [...this.resources];
    newSheet.resources[index] = resource;
    return newSheet;
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
    const cache = new Cache<ResolvedStatistic>();

    return this.resources.map(r => this.resolveResource(cache, r));
  }

  get resolvedStatistics(): ResolvedStatistic[] {
    // use lookup cache so we only calculate each statistic once, even if multiple statistics refer to them
    const cache = new Cache<ResolvedStatistic>();

    return this.statistics.map(statistic => this.innerResolveStatistic(cache, statistic));
  }

  findStatistic(statisticName: string): Statistic | undefined {
    return this.statistics.find(s => s.name.toLowerCase() === statisticName.toLowerCase());
  }

  resolveStatistic(statisticName: string): ResolvedStatistic | undefined {
    const statistic = this.findStatistic(statisticName);
    return statistic ? this.innerResolveStatistic(new Cache<ResolvedStatistic>(), statistic) : statistic;
  }

  previewFormulaValue(formula: string) {
    const cache = new Cache<ResolvedStatistic>();

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
      const action = new Action();
      action.name = ability.name;
      action.cost = a;
      return action;
    });
  }

  private resolveResource(cache: Cache<ResolvedStatistic>, r: Resource): ResolvedResource {
    const resource = new ResolvedResource(r);

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

      const resolvedStatistic = new ResolvedStatistic(statistic);

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
      const statisticValue = statistic ? this.innerResolveStatistic(cache, statistic).value : NaN;

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