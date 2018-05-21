import { BaseAction } from '../core/BaseAction';
import Sheet from '../sheet/SheetModel';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import ActionRegistry from '../core/ActionRegistry';

// LOAD
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

export const loadSheetsHandler = new ActionRegistry<LoadSheetsAction, SheetState>(
  LOAD_SHEET_SUCCESS,
  handleLoadSheets
  );