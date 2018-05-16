import Sheet, * as Model from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import { Dispatch, AnyAction } from 'redux';

export const SHEET_SUCCESS_SUFFIX = '_SHEET_SUCCESS';

export const ACTIVATE_CONDITION_SHEET_SUCCESS = 'ACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export const INACTIVATE_CONDITION_SHEET_SUCCESS = 'INACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;

export const CREATE_SHEET_SUCCESS = 'SAVE' + SHEET_SUCCESS_SUFFIX;
export const UPDATE_SHEET_SUCCESS = 'UPDATE' + SHEET_SUCCESS_SUFFIX;
export const LOAD_SHEET_SUCCESS = 'LOAD' + SHEET_SUCCESS_SUFFIX;
export const DELETE_SHEET_SUCCESS = 'DELETE' + SHEET_SUCCESS_SUFFIX;

export type CreateSheetAction = BaseAction & {
  sheet: Model.Sheet
};

export type UpdateSheetAction = BaseAction & {
  sheet: Model.Sheet
};

export type DeleteSheetAction = BaseAction & {
  sheetIdentifier: string
};

export type LoadSheetsAction = BaseAction & {
  sheets: Model.Sheet[]
};

export type ConnectedSheetProps = {
  createSheet?: (sheet: Model.Sheet) => void;
  updateSheet?: (sheet: Model.Sheet) => void;
  deleteSheet?: (sheetIdentifier: string) => void;
  loadSheets?: (sheets: Model.Sheet[]) => void;
};

export function mapSheetActions(dispatch: Dispatch<AnyAction>): ConnectedSheetProps {
  return {
    createSheet: (sheet: Sheet) => dispatch(createSheet(sheet)),
    updateSheet: (sheet: Sheet) => dispatch(updateSheet(sheet)),
    deleteSheet: (sheetIdentifier: string) => dispatch(deleteSheet(sheetIdentifier)),
    loadSheets: (sheets: Sheet[]) => dispatch(loadSheets(sheets))
  };
}

export function createSheet(sheet: Model.Sheet): CreateSheetAction {
  return { type: CREATE_SHEET_SUCCESS, sheet };
}

export function updateSheet(sheet: Model.Sheet): UpdateSheetAction {
  return { type: UPDATE_SHEET_SUCCESS, sheet };
}

export function deleteSheet(sheetIdentifier: string): DeleteSheetAction {
  return { type: DELETE_SHEET_SUCCESS, sheetIdentifier };
}

export function loadSheets(sheets: Model.Sheet[]): LoadSheetsAction {
  return { type: LOAD_SHEET_SUCCESS, sheets };
}

// function createSheetSuccess(sheet: Model.Sheet): CreateSheetAction {
//     return { type: CREATE_SHEET_SUCCESS, sheet };
// }

// function updateSheetSuccess(sheet: Model.Sheet): UpdateSheetAction {
//     return { type: UPDATE_SHEET_SUCCESS, sheet };
// }

// function deleteSheetSuccess(sheetIdentifier: string): DeleteSheetAction {
//     return { type: DELETE_SHEET_SUCCESS, sheetIdentifier };
// }

// function loadSheetsSuccess(sheets: Model.Sheet[]): LoadSheetsAction {
//     return { type: LOAD_SHEET_SUCCESS, sheets };
// }

// export function saveSheet(sheet: Model.Sheet): (dispatch: Dispatch) => 
// Promise<CreateSheetAction | UpdateSheetAction> {
//     return function (dispatch: Dispatch) {
//         return Promise.resolve()
//             .then(() => {
//                 return true
//                     ? dispatch(updateSheetSuccess(sheet))
//                     : dispatch(createSheetSuccess(sheet));
//             });
//     };
// }

// export function deleteSheet(sheetIdentifier: string): (dispatch: Dispatch) 
// => Promise<DeleteSheetAction> {
//     return function (dispatch: Dispatch) {
//         return Promise.resolve()
//             .then(() => dispatch(deleteSheetSuccess(sheetIdentifier)));
//     };
// }

// export function loadSheets(): (dispatch: Dispatch) => Promise<LoadSheetsAction> {
//     return function (dispatch: Dispatch) {
//         return Promise.resolve()
//             .then(() => dispatch(loadSheetsSuccess([])));
//     };
// }