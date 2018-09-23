import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

export const DELETE_LOG_SUCCESS = 'DELETE_LOG' + SHEET_SUCCESS_SUFFIX;
export type DeleteLogAction = BaseAction & {
  sheetIdentifier: string,
  timestamp: string
};
export function deleteLog(sheetIdentifier: string, timestamp: string): DeleteLogAction {
  return { type: DELETE_LOG_SUCCESS, sheetIdentifier, timestamp };
}
export function handleDeleteLog(deleteLogAction: DeleteLogAction, state: SheetState) {
  const { sheetIdentifier, timestamp } = deleteLogAction;

  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.deleteLog(timestamp))
  };
}

add(
  DELETE_LOG_SUCCESS,
  handleDeleteLog
);