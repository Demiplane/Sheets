import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';
import { Statistic } from '../sheet/SheetModel';

export const DELETE_STATISTIC_SUCCESS = 'DELETE_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type DeleteStatisticAction = BaseAction & {
  sheetIdentifier: number,
  statistic: Statistic
};
export function deleteStatistic(sheetIdentifier: number, statistic: Statistic): DeleteStatisticAction {
  return { type: DELETE_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleDeleteStatistic(deleteStatisticAction: DeleteStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = deleteStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.id === sheetIdentifier));

  let oldStatistics = sheetToUpdate.statistics || [];

  sheetToUpdate.statistics = oldStatistics.filter(o => o.id !== statistic.id);

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.id !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  DELETE_STATISTIC_SUCCESS,
  handleDeleteStatistic
);