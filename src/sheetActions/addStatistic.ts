import { Statistic } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

export const ADD_STATISTIC_SUCCESS = 'ADD_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type AddStatisticAction = BaseAction & {
  sheetIdentifier: string,
  statistic: Statistic
};
export function addStatistic(sheetIdentifier: string, statistic: Statistic): AddStatisticAction {
  return { type: ADD_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleAddStatistic(addStatisticAction: AddStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = addStatisticAction;
  
  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.addStatistic(statistic))
  };
}

add(
  ADD_STATISTIC_SUCCESS,
  handleAddStatistic
);