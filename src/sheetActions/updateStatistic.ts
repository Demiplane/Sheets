import { Statistic } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

// UPDATE STATISTIC
export const UPDATE_STATISTIC_SUCCESS = 'UPDATE_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type UpdateStatisticAction = BaseAction & {
  sheetIdentifier: string,
  statistic: Statistic
};
export function updateStatistic(sheetIdentifier: string, statistic: Statistic): UpdateStatisticAction {
  return { type: UPDATE_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleUpdateStatistic(updateStatisticAction: UpdateStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = updateStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));
  let oldStatistics = sheetToUpdate.statistics || [];
  const oldStatistic = oldStatistics.find(o => o.name === statistic.name);

  if (oldStatistic) {
    const index = oldStatistics.indexOf(oldStatistic);
    oldStatistics[index] = statistic;
  } else {
    oldStatistics = [...oldStatistics, statistic];
  }

  sheetToUpdate.statistics = oldStatistics;

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  UPDATE_STATISTIC_SUCCESS,
  handleUpdateStatistic
);