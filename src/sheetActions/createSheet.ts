import Sheet from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const CREATE_SHEET_SUCCESS = 'CREATE' + SHEET_SUCCESS_SUFFIX;
export type CreateSheetAction = BaseAction & {
  sheet: Sheet
};
export function createSheet(sheet: Sheet): CreateSheetAction {
  return { type: CREATE_SHEET_SUCCESS, sheet };
}
export function handleCreateSheet(createAction: CreateSheetAction, state: SheetState) {
  return {
    sheets: [...state.sheets,
    createAction.sheet
    ]
  };
}

add(
  CREATE_SHEET_SUCCESS,
  handleCreateSheet
);