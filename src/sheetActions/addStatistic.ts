import { Statistic } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

// ADD STATISTIC
export const ADD_STATISTIC_SUCCESS = 'ADD_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type AddStatisticAction = BaseAction & {
  sheetIdentifier: number,
  statistic: Statistic
};
export function addStatistic(sheetIdentifier: number, statistic: Statistic): AddStatisticAction {
  return { type: ADD_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleAddStatistic(addStatisticAction: AddStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = addStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.id === sheetIdentifier));

  let oldStatistics = sheetToUpdate.statistics || [];

  sheetToUpdate.statistics = [...oldStatistics, statistic];

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.id !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  ADD_STATISTIC_SUCCESS,
  handleAddStatistic
);