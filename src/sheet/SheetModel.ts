var math = require('mathjs');
import Cache from '../core/Cache';

export class Sheet {
  name: string = '';
  statistics: Statistic[] = [];
  abilities: Ability[] = [];
  inventory: Item[] = [];
  conditions: Condition[] = [];
  resources: Resource[] = [];
  logs: Log[] = [];
  
  get actions(): string[] {
    return this.abilities
      .map(ability => ability.actionCost)
      .reduce((acc, cur) => acc.concat(cur));
  }

  statisticIsBase(statistic: Statistic) {
    return !isNaN(Number(statistic.formula));
  }

  isConditional(statistic: Statistic): boolean {
    return this.conditions
      .map(c => c.targets)
      .reduce((a, c) => a.concat(c))
      .find(t => t === statistic.name) ? true : false;
  }

  findStatistic(statisticName: string): Statistic | undefined {
    return this.statistics.find(s => s.name === statisticName);
  }

  resolveStatistic(statisticName: string): ResolvedStatistic | undefined {
    var statistic = this.findStatistic(statisticName);
    return statistic ? this.innerResolveStatistic(new Cache<ResolvedStatistic>(), statistic) : statistic;
  }

  get resolvedResources(): ResolvedResource[] {
    var cache = new Cache<ResolvedStatistic>();

    return this.resources.map(r => {
      var resource = new ResolvedResource();

      resource.formula = r.formula;
      resource.current = r.current;
      resource.name = r.name;
      resource.value = this.innerCalculateFormula(cache, r.formula);

      return resource;
    });
  }

  get resolvedStatistics(): ResolvedStatistic[] {
    // use lookup cache so we only calculate each statistic once, even if multiple statistics refer to them
    var cache = new Cache<ResolvedStatistic>();

    return this.statistics.map(statistic => this.innerResolveStatistic(cache, statistic));
  }

  innerResolveStatistic(cache: Cache<ResolvedStatistic>, statistic: Statistic): ResolvedStatistic {
    return cache.getFromCache(statistic.name, key => {

      const value = this.innerCalculateFormula(cache, statistic.formula);
      const modified = this.conditionsTargetingStatistic(cache, statistic);
      const conditional = this.isConditional(statistic);
      const base = this.statisticIsBase(statistic);

      var resolvedStatistic = new ResolvedStatistic();

      resolvedStatistic.value = value + modified;
      resolvedStatistic.name = key;
      resolvedStatistic.formula = statistic.formula;
      resolvedStatistic.conditional = conditional;
      resolvedStatistic.base = base;

      return resolvedStatistic;
    });
  }

  conditionsTargetingStatistic(cache: Cache<ResolvedStatistic>, statistic: Statistic): number {
    return this.conditions
      .filter(c => c.targets.find(t => t === statistic.name))
      .map(c => this.innerCalculateFormula(cache, c.formula))
      .reduce((acc, cur) => acc + cur);
  }

  innerCalculateFormula(cache: Cache<ResolvedStatistic>, formula: string): number {
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

export class Condition {
  targets: string[] = [];
  formula: string = '0';
  active: boolean = false;
}

export class Item {
  name: string = '';
  description: string = '';
  stock: number = 0;
}

export class Ability {
  name: string = '';
  source: string = '';
  description: string = '';
  actionCost: string[] = [];
}

export class Statistic {
  name: string = '';
  formula: string = '0';
}

export class ResolvedStatistic extends Statistic {
  conditional: boolean = false;
  base: boolean = false;
  value: number = 0;
}

export class Resource {
  name: string = '';
  current: number = 0;
  formula: string = '0';
}

export class ResolvedResource extends Resource {
  value: number = 0;
}

export class Log {
  timestamp: string;
  text: string;
}

export default Sheet;