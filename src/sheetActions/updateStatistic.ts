import { Statistic } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

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
  
  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.updateStatistic(statistic))
  };
}

add(
  UPDATE_STATISTIC_SUCCESS,
  handleUpdateStatistic
);