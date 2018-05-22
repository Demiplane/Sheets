import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';
import { Statistic } from '../sheet/SheetModel';

// DELETE STATISTIC
export const DELETE_STATISTIC_SUCCESS = 'DELETE_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type DeleteStatisticAction = BaseAction & {
  sheetIdentifier: string,
  statistic: Statistic
};
export function deleteStatistic(sheetIdentifier: string, statistic: Statistic): DeleteStatisticAction {
  return { type: DELETE_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleDeleteStatistic(deleteStatisticAction: DeleteStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = deleteStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));

  let oldStatistics = sheetToUpdate.statistics || [];

  sheetToUpdate.statistics = oldStatistics.filter(o => o.name !== statistic.name);

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  DELETE_STATISTIC_SUCCESS,
  handleDeleteStatistic
);