import { BaseAction } from '../core/BaseAction';
import Sheet from '../sheet/SheetModel';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const UPDATE_SHEET_SUCCESS = 'UPDATE' + SHEET_SUCCESS_SUFFIX;
export type UpdateSheetAction = BaseAction & {
  sheet: Sheet
};
export function updateSheet(sheet: Sheet): UpdateSheetAction {
  return { type: UPDATE_SHEET_SUCCESS, sheet };
}
export function handleUpdateSheet(updateAction: UpdateSheetAction, state: SheetState) {
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== updateAction.sheet.name),
      Object.assign({}, updateAction.sheet)
    ]
  };
}

add(
  UPDATE_SHEET_SUCCESS,
  handleUpdateSheet
);