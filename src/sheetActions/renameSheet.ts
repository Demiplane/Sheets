import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

export const RENAME_SHEET_SUCCESS = 'RENAME' + SHEET_SUCCESS_SUFFIX;
export type RenameSheetAction = BaseAction & {
  sheetIdentifier: string,
  name: string
};
export function renameSheet(sheetIdentifier: string, name: string): RenameSheetAction {
  return { type: RENAME_SHEET_SUCCESS, sheetIdentifier, name };
}
export function handleRenameSheet(renameAction: RenameSheetAction, state: SheetState) {
  const { sheetIdentifier, name } = renameAction;
  
  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.rename(name))
  };
}

add(
  RENAME_SHEET_SUCCESS,
  handleRenameSheet
);