var math = require('mathjs');
import Cache from '../core/Cache';

export const statisticValueCache: Cache<number> = new Cache<number>();

export function selectActions(sheet: Sheet): Action[] {
  const actions = sheet.actions || [];
  const abilityActions = (sheet.abilities || [])
    .filter(a => a.actionCost)
    .filter(a => a.actionCost!.length > 0)
    .map(a => ({ name: a.name, actionCost: a.actionCost, description: a.description }));

  const combined = actions.concat(abilityActions);

  return combined;
}

export function selectResources(sheet: Sheet): { resource: Resource, maximum: number }[] {
  if (!sheet || !sheet.statistics) {
    return [];
  }
  const resources = sheet
    .statistics
    .filter(s => s.resource)
    .map(s => ({
      resource: s.resource!,
      maximum: calculateValue(sheet, s)
    }));
  return resources;
}

export function calculateValue(sheet: Sheet, statistic: Statistic): number {
  return statistic.name ? statisticValueCache.getFromCache(statistic.name!, key => {
    if (!statistic.name || statistic.name === 'unknown') {
      return 0;
    }

    let formulaeTotal = (statistic.modifiers || [])
      .filter(modifier => modifier.formula)
      .map(formula => calculateFormula(sheet, formula.formula!))
      .map(formula => Math.floor(formula))
      .reduce((l, r) => l + r, 0);

    return formulaeTotal;
  }) : 0;
}

export function calculateFormula(sheet: Sheet, formula?: string): number {
  if (!formula) {
    return 0;
  }

  let regex = /\[[a-zA-z ]+\]/g;
  let matches = formula.match(regex) || [];

  let expression = formula;

  matches.forEach(m => {
    let statisticName = m.replace('[', '').replace(']', '');
    let statistic = findStatistic(sheet, statisticName);
    var statisticValue = statistic ? calculateValue(sheet, statistic) : 0;

    expression = expression.replace(m, statisticValue.toString());
  });

  let final = math.eval(expression);

  return final;
}

function findStatistic(sheet: Sheet, statisticName: string): Statistic | null {
  let statistics = sheet.statistics || [];
  let candidates = statistics.filter(s => s.name === statisticName);

  return candidates.length > 0
    ? candidates[0]
    : null;
}

export type Sheet = {
  identifier: string;
  name?: string;
  statistics?: Statistic[];
  abilities?: Ability[];
  inventory?: Item[];
  actions?: Action[];
};

export type Action = {
  name?: string;
  description?: string;
  actionCost?: string[];
};

export type Item = {
  name: string;
  description?: string;
  stock?: number;
};

export type Ability = {
  name: string;
  source?: string;
  description?: string;
  actionCost?: string[];
};

export type Statistic = {
  name: string;
  modifiers?: Modifier[];
  resource?: Resource;
  conditionals?: Conditional[];
};

export type Conditional = Modifier & {
  condition?: string;
};

export type Modifier = {
  formula?: string,
  source?: string
};

export type Resource = {
  name?: string;
  current?: number;
  recharge?: Recharge[];
};

export type Recharge = {
  name?: string;
  restorationFormulae?: string[];
};

export default Sheet;