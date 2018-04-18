import * as Model from '../sheet/sheetModel';
import { Dispatch } from 'redux';

export const SHEET_SUCCESS_SUFFIX = '_SHEET_SUCCESS';

export const CREATE_SHEET_SUCCESS = 'SAVE' + SHEET_SUCCESS_SUFFIX;
export const UPDATE_SHEET_SUCCESS = 'UPDATE' + SHEET_SUCCESS_SUFFIX;
export const LOAD_SHEET_SUCCESS = 'LOAD' + SHEET_SUCCESS_SUFFIX;
export const DELETE_SHEET_SUCCESS = 'DELETE' + SHEET_SUCCESS_SUFFIX;

export type CreateSheetAction = {
    type: string,
    sheet: Model.Sheet
};

export type UpdateSheetAction = {
    type: string,
    sheet: Model.Sheet
};

export type DeleteSheetAction = {
    type: string,
    sheetIdentifier: string
};

export type LoadSheetsAction = {
    type: string,
    sheets: Model.Sheet[]
};

function createSheetSuccess(sheet: Model.Sheet) {
    return { type: CREATE_SHEET_SUCCESS, sheet };
}

function updateSheetSuccess(sheet: Model.Sheet) {
    return { type: UPDATE_SHEET_SUCCESS, sheet };
}

function deleteSheetSuccess(sheetIdentifier: string) {
    return { type: DELETE_SHEET_SUCCESS, sheetIdentifier };
}

function loadSheetsSuccess(sheets: Model.Sheet[]) {
    return { type: LOAD_SHEET_SUCCESS, sheets };
}

export function saveSheet(sheet: Model.Sheet): (dispatch: Dispatch) => Promise<CreateSheetAction | UpdateSheetAction> {
    return function (dispatch: Dispatch) {
        return Promise.resolve()
            .then(() => {
                return true
                    ? dispatch(updateSheetSuccess(sheet))
                    : dispatch(createSheetSuccess(sheet));
            });
    };
}

export function deleteSheet(sheetIdentifier: string): (dispatch: Dispatch) => Promise<DeleteSheetAction> {
    return function (dispatch: Dispatch) {
        return Promise.resolve()
            .then(() => dispatch(deleteSheetSuccess(sheetIdentifier)));
    };
}

export function loadSheets(): (dispatch: Dispatch) => Promise<LoadSheetsAction> {
    return function (dispatch: Dispatch) {
        return Promise.resolve()
            .then(() => dispatch(loadSheetsSuccess([])));
    };
}