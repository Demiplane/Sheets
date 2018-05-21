var math = require('mathjs');
import Cache from '../core/Cache';
import { distinct } from '../core/distinct';

export const statisticValueCache: Cache<number> = new Cache<number>();

export function conditionIsActive(sheet: Sheet, condition: string) {
  return sheet.conditions.filter(c => c === condition).length > 0;
}

export function selectActions(sheet: Sheet): Action[] {
  const actions = sheet.actions || [];
  const abilityActions = (sheet.abilities || [])
    .filter(a => a.actionCost)
    .filter(a => a.actionCost!.length > 0)
    .map(a => ({ name: a.name, actionCost: a.actionCost, description: a.description }));

  const combined = actions.concat(abilityActions);

  return combined;
}

export function getConditions(sheet: Sheet) {
  const statistics = sheet.statistics || [];
  const modifiers = statistics
    .filter(statistic => statistic.modifiers)
    .map(statistic => statistic.modifiers!)
    .reduce((l, r) => l.concat(r), []);
  const conditions = modifiers
    .filter(modifier => modifier.condition)
    .map(modifier => modifier.condition!);
  const sortedDistinctConditions =
    distinct(conditions)
    .sort();
    
  return sortedDistinctConditions;
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

export function modifierIsSimple(modifier: Modifier) {
  return !isNaN(Number(modifier.formula));
}

export function modifierIsBase(modifier: Modifier) {
  return modifierIsSimple(modifier);
}

export function statisticIsBase(sheet: Sheet, statistic: Statistic) {
  const onlyHasBaseModifiers = statistic.modifiers && statistic
    .modifiers
    .map(modifierIsBase)
    .reduce((l, r) => l && r) || false;

  return onlyHasBaseModifiers;
}

export function statisticHasConditionals(statistic: Statistic) {
  return statistic.modifiers && statistic.modifiers.filter(isConditional).length > 0;
}

export function isConditional(modifier: Modifier) {
  return modifier.condition ? modifier.condition !== '' : false;
}

export function isUnderCondition(sheet: Sheet, modifier: Modifier) {
  if (!modifier.condition || modifier.condition === '') {
    return true;
  }
  if (!sheet.conditions) {
    return false;
  }

  return conditionIsActive(sheet, modifier.condition);
}

export function calculateValue(sheet: Sheet, statistic: Statistic): number {
  return statistic.name ? statisticValueCache.getFromCache(statistic.name!, key => {
    if (!statistic.name || statistic.name === 'unknown') {
      return 0;
    }

    const formulaeTotal = (statistic.modifiers || [])
      .filter(modifier => modifier.formula)
      .filter(modifier => !isConditional(modifier) || isUnderCondition(sheet, modifier))
      .map(formula => calculateFormula(sheet, formula.formula!))
      .reduce((l, r) => l + r, 0);

    return Math.floor(formulaeTotal);
  }) : 0;
}

export function calculateFormula(sheet: Sheet, formula?: string): number {
  if (!formula) {
    return 0;
  }

  const regex = /\[[a-zA-z ]+\]/g;
  const matches = formula.match(regex) || [];

  let expression = formula;

  matches.forEach(m => {
    const statisticName = m.replace('[', '').replace(']', '');
    const statistic = findStatistic(sheet, statisticName);
    var statisticValue = statistic ? calculateValue(sheet, statistic) : 0;

    expression = expression.replace(m, statisticValue.toString());
  });

  const final = math.eval(expression);

  return Math.floor(final);
}

function findStatistic(sheet: Sheet, statisticName: string): Statistic | null {
  const statistics = sheet.statistics || [];
  const candidates = statistics.filter(s => s.name === statisticName);

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
  conditions: string[];
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
};

export type Modifier = {
  id: number,
  condition?: string,
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