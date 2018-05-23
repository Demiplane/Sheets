import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const DELETE_SHEET_SUCCESS = 'DELETE' + SHEET_SUCCESS_SUFFIX;
export type DeleteSheetAction = BaseAction & {
  sheetIdentifier: number
};
export function deleteSheet(sheetIdentifier: number): DeleteSheetAction {
  return { type: DELETE_SHEET_SUCCESS, sheetIdentifier };
}
export function handleDeleteSheet(deleteAction: DeleteSheetAction, state: SheetState) {
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.id !== deleteAction.sheetIdentifier)
    ]
  };
}

add(
  DELETE_SHEET_SUCCESS,
  handleDeleteSheet
);