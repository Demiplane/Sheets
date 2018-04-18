var math = require('mathjs');
import Cache from '../core/Cache';

export const statisticValueCache: Cache<number> = new Cache<number>();

export function calculateValue(sheet: Sheet, statistic: Statistic): number {
    return statistic.name ? statisticValueCache.getFromCache(statistic.name!, key => {
        if (statistic.cachedValue) {
            return statistic.cachedValue;
        }

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

function calculateFormula(sheet: Sheet, formula: string): number {
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
};

export type Item = {
    name?: string;
    description?: string;
    stock?: number;
};

export type Ability = {
    name?: string;
    source?: string;
    description?: string;
    actionCost?: string[];
};

export type Statistic = {
    name?: string;
    modifiers?: Modifier[];
    cachedValue?: number;
    resource?: Resource;
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