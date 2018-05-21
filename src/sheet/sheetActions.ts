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

export const SHEET_SUCCESS_SUFFIX = '_SHEET_SUCCESS';

export type ConnectedSheetProps = {
  activateCondition?: (sheetIdentifier: string, condition: string) => void;
  inactivateCondition?: (sheetIdentifier: string, condition: string) => void;
  updateStatistic?: (sheetIdentifier: string, statistic: Statistic) => void;
  addStatistic?: (sheetIdentifier: string, statistic: Statistic) => void;
  deleteStatistic?: (sheetIdentifier: string, statisticName: string) => void;
  createSheet?: (sheet: Sheet) => void;
  updateSheet?: (sheet: Sheet) => void;
  deleteSheet?: (sheetIdentifier: string) => void;
  loadSheets?: (sheets: Sheet[]) => void;
};

export function mapSheetActions(dispatch: Dispatch<AnyAction>): ConnectedSheetProps {
  return {
    activateCondition: (sheetIdentifier: string, condition: string) =>
      dispatch(activateCondition(sheetIdentifier, condition)),
    inactivateCondition: (sheetIdentifier: string, condition: string) =>
      dispatch(inactivateCondition(sheetIdentifier, condition)),
    updateStatistic: (sheetIdentifier: string, statistic: Statistic) =>
      dispatch(updateStatistic(sheetIdentifier, statistic)),
    addStatistic: (sheetIdentifier: string, statistic: Statistic) =>
      dispatch(addStatistic(sheetIdentifier, statistic)),
    deleteStatistic: (sheetIdentifier: string, statisticName: string) =>
      dispatch(deleteStatistic(sheetIdentifier, statisticName)),
    createSheet: (sheet: Sheet) => dispatch(createSheet(sheet)),
    updateSheet: (sheet: Sheet) => dispatch(updateSheet(sheet)),
    deleteSheet: (sheetIdentifier: string) => dispatch(deleteSheet(sheetIdentifier)),
    loadSheets: (sheets: Sheet[]) => dispatch(loadSheets(sheets))
  };
}

// function createSheetSuccess(sheet: Sheet): CreateSheetAction {
//     return { type: CREATE_SHEET_SUCCESS, sheet };
// }

// function updateSheetSuccess(sheet: Sheet): UpdateSheetAction {
//     return { type: UPDATE_SHEET_SUCCESS, sheet };
// }

// function deleteSheetSuccess(sheetIdentifier: string): DeleteSheetAction {
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