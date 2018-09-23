import { Log } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

export const ADD_LOG_SUCCESS = 'ADD_LOG' + SHEET_SUCCESS_SUFFIX;
export type AddLogAction = BaseAction & {
  sheetIdentifier: string,
  log: Log  
};
export function addLog(sheetIdentifier: string, log: Log): AddLogAction {
  return { type: ADD_LOG_SUCCESS, sheetIdentifier, log };
}
export function handleAddLog(addLogAction: AddLogAction, state: SheetState) {
  const { sheetIdentifier, log } = addLogAction;

  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.addLog(log))
  };
}

add(
  ADD_LOG_SUCCESS,
  handleAddLog
);