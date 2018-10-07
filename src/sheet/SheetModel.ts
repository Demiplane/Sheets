const math = require('mathjs');
import Cache from '../core/Cache';

/* tslint:disable no-any */

export class Target {
  statisticName: string = '';
  formula: string = '0';

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.statisticName = source.statisticName || '';
    this.formula = source.formula || '0';
  }

  updateName(name: string) {
    const newTarget = new Target(this);
    newTarget.statisticName = name;
    return newTarget;
  }

  updateFormula(formula: string) {
    const newTarget = new Target(this);
    newTarget.formula = formula;
    return newTarget;
  }
}

export class Effect {
  name: string = '';
  targets: Target[] = [];
  active: boolean = false;

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.active = source.active || false;

    if (source instanceof Effect) {
      this.targets = source.targets;
    } else {
      this.targets = source.targets ? source.targets.map((t: any) => new Target(t)) : [];
    }
  }

  addTarget(target: Target) {
    const newEffect = new Effect(this);
    newEffect.targets = [...newEffect.targets, target];
    return newEffect;
  }

  updateName(name: string) {
    const newEffect = new Effect(this);
    newEffect.name = name;
    return newEffect;
  }

  updateTargets(targets: Target[]) {
    const newEffect = new Effect(this);
    newEffect.targets = targets;
    return newEffect;
  }

  updateTarget(index: number, target: Target) {
    const newEffect = new Effect(this);
    newEffect.targets[index] = target;
    return newEffect;
  }

  deleteTarget(target: Target) {
    const newEffect = new Effect(this);
    newEffect.targets = newEffect.targets.filter(t => t.statisticName === target.statisticName);
    return newEffect;
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

  updateName(name: string) {
    const newItem = new Item(this);
    newItem.name = name;
    return newItem;
  }

  updateDescription(description: string) {
    const newItem = new Item(this);
    newItem.description = description;
    return newItem;
  }

  updateStock(stock: number) {
    const newItem = new Item(this);
    newItem.stock = stock;
    return newItem;
  }
}

export class Ability {
  name: string = '';
  description: string = '';
  actions: string[] = [];

  constructor(source: any) {
    if (!source) {
      return;
    }

    this.name = source.name || '';
    this.description = source.description || '';
    this.actions = source.actions ? source.actions : [];
  }

  updateName(name: string) {
    const newAbility = new Ability(this);
    newAbility.name = name;
    return newAbility;
  }

  updateDescription(description: string) {
    const newAbility = new Ability(this);
    newAbility.description = description;
    return newAbility;
  }

  updateActions(actions: string[]) {
    const newAbility = new Ability(this);
    newAbility.actions = actions;
    return newAbility;
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
  affected: boolean = false;
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
  effects: Effect[] = [];
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
      this.effects = source.effects;
      this.resources = source.resources;
      this.logs = source.logs;
    } else {
      this.statistics = source.statistics ? source.statistics.map((s: any) => new Statistic(s)) : [];
      this.abilities = source.abilities ? source.abilities.map((s: any) => new Ability(s)) : [];
      this.inventory = source.inventory ? source.inventory.map((s: any) => new Item(s)) : [];
      this.effects = source.effects ? source.effects.map((s: any) => new Effect(s)) : [];
      this.resources = source.resources ? source.resources.map((s: any) => new Resource(s)) : [];
      this.logs = source.logs ? source.logs.map((s: any) => new Log(s)) : [];
    }
  }

  // state transitions

  addAbility(ability: Ability) {
    const newSheet = new Sheet(this);
    newSheet.abilities = [...newSheet.abilities, ability];
    return newSheet;
  }

  updateAbility(index: number, ability: Ability) {
    const newSheet = new Sheet(this);
    newSheet.abilities = [...newSheet.abilities];
    newSheet.abilities[index] = ability;
    return newSheet;
  }

  deleteAbility(ability: Ability) {
    const newSheet = new Sheet(this);
    newSheet.abilities = [...newSheet.abilities.filter(a => a.name !== ability.name)];
    return newSheet;
  }

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

  moveStatistic(indexToMove: number, newLocation: number) {
    const newSheet = new Sheet(this);
    newSheet.statistics = this.move(newSheet.statistics, indexToMove, newLocation);
    return newSheet;
  }

  move<T>(array: T[], indexToMove: number, indexToMoveTo: number) {
    if (indexToMove >= array.length || indexToMove < 0 ||
      indexToMoveTo >= array.length || indexToMoveTo < 0) {
      return array;
    }

    var working = [...array];

    console.log(indexToMove, indexToMoveTo);

    var moved = working[indexToMove];
    working.splice(indexToMove, 1);
    working.splice(indexToMoveTo > indexToMove ?
      indexToMoveTo : indexToMoveTo, 0, moved);

    return working;
  }

  activateEffect(effect: Effect): Sheet {
    return this.setEffectActive(effect.name, true);
  }

  inactivateEffect(effect: Effect): Sheet {
    return this.setEffectActive(effect.name, false);
  }

  updateEffect(index: number, effect: Effect) {
    const newSheet = new Sheet(this);
    newSheet.effects = [...this.effects];
    newSheet.effects[index] = effect;
    return newSheet;
  }

  addEffect(effect: Effect) {
    const newSheet = new Sheet(this);
    newSheet.effects = [...this.effects, effect];
    return newSheet;
  }

  deleteEffect(effect: Effect) {
    const newSheet = new Sheet(this);
    newSheet.effects = this.effects.filter(e => e.name !== effect.name);
    return newSheet;
  }

  updateResource(index: number, resource: Resource) {
    const newSheet = new Sheet(this);
    newSheet.resources = [...this.resources];
    newSheet.resources[index] = resource;
    return newSheet;
  }

  addResource(resource: Resource) {
    const newSheet = new Sheet(this);
    newSheet.resources = [...this.resources, resource];
    return newSheet;
  }

  deleteResource(resource: Resource) {
    const newSheet = new Sheet(this);
    newSheet.resources = this.resources.filter(r => r.name !== resource.name);
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
      .reduce((acc, cur) => acc.concat(cur), []);
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

  private setEffectActive(effectName: string, active: boolean): Sheet {
    const index = this.effects.findIndex(c => c.name === effectName);
    const oldEffect = this.effects[index];
    if (oldEffect.active === active) {
      return this;
    }

    const newSheet = new Sheet(this);
    newSheet.effects = [...newSheet.effects];
    const newEffect = new Effect(oldEffect);
    newEffect.active = active;

    newSheet.effects[index] = newEffect;

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
      const modified = this.affectedModifier(cache, statistic);
      const affected = this.isAffected(statistic);
      const base = this.statisticIsBase(statistic);

      const resolvedStatistic = new ResolvedStatistic(statistic);

      resolvedStatistic.value = value + modified;
      resolvedStatistic.name = key;
      resolvedStatistic.formula = statistic.formula;
      resolvedStatistic.affected = affected;
      resolvedStatistic.base = base;

      return resolvedStatistic;
    });
  }

  private effectsTargetingStatistic(statistic: Statistic, force: boolean = false): Target[] {
    return this.effects
      .filter(c => c.active || force)
      .map(c => c.targets)
      .reduce((acc, cur) => acc.concat(cur), [])
      .filter(c => c.statisticName === statistic.name);
  }

  private isAffected(statistic: Statistic): boolean {
    return this.effectsTargetingStatistic(statistic, true).length > 0;
  }

  private affectedModifier(cache: Cache<ResolvedStatistic>, statistic: Statistic): number {
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