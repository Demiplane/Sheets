import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const DELETE_SHEET_SUCCESS = 'DELETE' + SHEET_SUCCESS_SUFFIX;
export type DeleteSheetAction = BaseAction & {
  sheetIdentifier: string
};
export function deleteSheet(sheetIdentifier: string): DeleteSheetAction {
  return { type: DELETE_SHEET_SUCCESS, sheetIdentifier };
}
export function handleDeleteSheet(deleteAction: DeleteSheetAction, state: SheetState) {
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== deleteAction.sheetIdentifier)
    ]
  };
}

add(
  DELETE_SHEET_SUCCESS,
  handleDeleteSheet
);