import { Dispatch, AnyAction } from 'redux';
import Sheet, { Statistic } from '../sheet/SheetModel';
import { activateCondition } from '../sheetActions/activateCondition';
import { inactivateCondition } from '../sheetActions/inactivateCondition';
import { updateStatistic } from '../sheetActions/updateStatistic';
import { addStatistic } from '../sheetActions/addStatistic';
import { deleteStatistic } from '../sheetActions/deleteStatistic';
import { createSheet } from '../sheetActions/createSheet';
import { updateSheet } from '../sheetActions/updateSheet';
import { deleteSheet } from '../sheetActions/deleteSheet';
import { loadSheets } from '../sheetActions/loadSheets';
import { renameSheet } from '../sheetActions/renameSheet';

export type ConnectedSheetProps = {
  activateCondition?: (sheetIdentifier: number, condition: string) => void;
  inactivateCondition?: (sheetIdentifier: number, condition: string) => void;
  updateStatistic?: (sheetIdentifier: number, statistic: Statistic) => void;
  addStatistic?: (sheetIdentifier: number, statistic: Statistic) => void;
  deleteStatistic?: (sheetIdentifier: number, statistic: Statistic) => void;
  createSheet?: (sheet: Sheet) => void;
  updateSheet?: (sheet: Sheet) => void;
  deleteSheet?: (sheetIdentifier: number) => void;
  loadSheets?: (sheets: Sheet[]) => void;
  renameSheet?: (sheetIdentifier: number, name: string) => void;
};

export function mapSheetActions(dispatch: Dispatch<AnyAction>): ConnectedSheetProps {
  return {
    activateCondition: (sheetIdentifier: number, condition: string) =>
      dispatch(activateCondition(sheetIdentifier, condition)),
    inactivateCondition: (sheetIdentifier: number, condition: string) =>
      dispatch(inactivateCondition(sheetIdentifier, condition)),
    updateStatistic: (sheetIdentifier: number, statistic: Statistic) =>
      dispatch(updateStatistic(sheetIdentifier, statistic)),
    addStatistic: (sheetIdentifier: number, statistic: Statistic) =>
      dispatch(addStatistic(sheetIdentifier, statistic)),
    deleteStatistic: (sheetIdentifier: number, statistic: Statistic) =>
      dispatch(deleteStatistic(sheetIdentifier, statistic)),
    createSheet: (sheet: Sheet) => dispatch(createSheet(sheet)),
    updateSheet: (sheet: Sheet) => dispatch(updateSheet(sheet)),
    deleteSheet: (sheetIdentifier: number) => dispatch(deleteSheet(sheetIdentifier)),
    loadSheets: (sheets: Sheet[]) => dispatch(loadSheets(sheets)),
    renameSheet: (sheetIdentifier: number, name: string) => dispatch(renameSheet(sheetIdentifier, name))
  };
}

// function createSheetSuccess(sheet: Sheet): CreateSheetAction {
//     return { type: CREATE_SHEET_SUCCESS, sheet };
// }

// function updateSheetSuccess(sheet: Sheet): UpdateSheetAction {
//     return { type: UPDATE_SHEET_SUCCESS, sheet };
// }

// function deleteSheetSuccess(sheetIdentifier: number): DeleteSheetAction {
//     return { type: DELETE_SHEET_SUCCESS, sheetIdentifier };
// }

// function loadSheetsSuccess(sheets: Sheet[]): LoadSheetsAction {
//     return { type: LOAD_SHEET_SUCCESS, sheets };
// }

// export function saveSheet(sheet: Sheet): (dispatch: Dispatch) => 
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

// export function deleteSheet(sheetIdentifier: number): (dispatch: Dispatch) 
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