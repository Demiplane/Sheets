import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

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
  const oldSheet = state.sheets.find(sheet => sheet.name === sheetIdentifier);
  const sheetToUpdate = Object.assign({}, oldSheet);

  sheetToUpdate.name = name;

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== sheetIdentifier),
      sheetToUpdate
    ]
  };
}

add(
  RENAME_SHEET_SUCCESS,
  handleRenameSheet
);