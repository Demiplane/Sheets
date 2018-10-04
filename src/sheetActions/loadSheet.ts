import { BaseAction } from '../core/BaseAction';
import Sheet from '../sheet/SheetModel';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';
import SheetState from '../sheet/SheetState';

export const LOAD_SHEET_SUCCESS = 'LOAD' + SHEET_SUCCESS_SUFFIX;
export type LoadSheetAction = BaseAction & {
  sheet: Sheet
};
export function loadSheet(sheet: Sheet): LoadSheetAction {
  return { type: LOAD_SHEET_SUCCESS, sheet };
}
export function handleLoadSheet(loadAction: LoadSheetAction, state: SheetState) {
  console.log('actiony');
  return { sheets: [...state.sheets.filter(s => s.name !== loadAction.sheet.name), loadAction.sheet] };
}

add(
  LOAD_SHEET_SUCCESS,
  handleLoadSheet
);