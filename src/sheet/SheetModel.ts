var math = require('mathjs');

export function calculateValue(sheet: Sheet, statistic: Statistic): number {
    if (statistic.cachedValue) {
        return statistic.cachedValue;
    }

    if (statistic.name === 'unknown') {
        return 0;
    }

    let formulaeTotal = statistic.modifiers
        .map(formula => calculateFormula(sheet, formula.formula))
        .map(formula => Math.floor(formula))
        .reduce((l, r) => l + r, 0);

    statistic.cachedValue = formulaeTotal;

    return formulaeTotal;
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

export function findStatistic(sheet: Sheet, statisticName: string): Statistic | null {
    let statistics = sheet.statistics || [];
    let candidates = statistics.filter(s => s.name === statisticName);

    return candidates.length > 0 ?
        candidates[0] : null;
}

export type Sheet = {
    name: string;
    statistics: Statistic[];
    abilities: Ability[];
    inventory: Item[];
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
    modifiers: { formula: string, source?: string }[];
    cachedValue?: number;
    resource?: Resource;
};

export type Resource = {
    name: string;
    current: number;
    recharge: {
        name: string;
        amount: string[];
    }[];
};

export default Sheet;