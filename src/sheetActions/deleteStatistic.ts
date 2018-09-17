import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';
import { Statistic } from '../sheet/SheetModel';

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
  
  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.deleteStatistic(statistic.name))
  };
}

add(
  DELETE_STATISTIC_SUCCESS,
  handleDeleteStatistic
);