import { BaseAction } from '../core/BaseAction';
import Sheet from '../sheet/SheetModel';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const LOAD_SHEETS_SUCCESS = 'LOAD_SHEETS' + SHEET_SUCCESS_SUFFIX;
export type LoadSheetsAction = BaseAction & {
  sheets: Sheet[]
};
export function loadSheets(sheets: Sheet[]): LoadSheetsAction {
  return { type: LOAD_SHEETS_SUCCESS, sheets };
}
export function handleLoadSheets(loadAction: LoadSheetsAction) {
  return { sheets: loadAction.sheets };
}

add(
  LOAD_SHEETS_SUCCESS,
  handleLoadSheets
);