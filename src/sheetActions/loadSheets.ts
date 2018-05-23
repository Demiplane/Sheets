import { BaseAction } from '../core/BaseAction';
import Sheet from '../sheet/SheetModel';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const LOAD_SHEET_SUCCESS = 'LOAD' + SHEET_SUCCESS_SUFFIX;
export type LoadSheetsAction = BaseAction & {
  sheets: Sheet[]
};
export function loadSheets(sheets: Sheet[]): LoadSheetsAction {
  return { type: LOAD_SHEET_SUCCESS, sheets };
}
export function handleLoadSheets(loadAction: LoadSheetsAction) {
  return { sheets: loadAction.sheets };
}

add(
  LOAD_SHEET_SUCCESS,
  handleLoadSheets
);