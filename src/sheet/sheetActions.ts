import { BaseAction } from '../core/BaseAction';
import { Dispatch, AnyAction } from 'redux';
import Sheet, { Statistic } from './SheetModel';
import SheetState from './SheetState';
import { distinct } from '../core/distinct';

export const SHEET_SUCCESS_SUFFIX = '_SHEET_SUCCESS';

// ACTIVATE CONDITION
export const ACTIVATE_CONDITION_SHEET_SUCCESS = 'ACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export type ActivateConditionAction = BaseAction & {
  sheetIdentifier: string,
  condition: string
};
export function activateCondition(sheetIdentifier: string, condition: string): ActivateConditionAction {
  return { type: ACTIVATE_CONDITION_SHEET_SUCCESS, sheetIdentifier, condition };
}
export function handleActivateCondition(activateAction: ActivateConditionAction, state: SheetState) {
  const { sheetIdentifier, condition } = activateAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));
  sheetToUpdate.conditions = distinct(sheetToUpdate.conditions.concat(condition));
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

// INACTIVATE CONDITION
export const INACTIVATE_CONDITION_SHEET_SUCCESS = 'INACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export type InactivateConditionAction = BaseAction & {
  sheetIdentifier: string,
  condition: string
};
export function inactivateCondition(sheetIdentifier: string, condition: string): InactivateConditionAction {
  return { type: INACTIVATE_CONDITION_SHEET_SUCCESS, sheetIdentifier, condition };
}
export function handleInactivateCondition(inactivateAction: InactivateConditionAction, state: SheetState) {
  const { sheetIdentifier, condition } = inactivateAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));
  sheetToUpdate.conditions = sheetToUpdate.conditions.filter(c => c !== condition);
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

// UPDATE STATISTIC
export const UPDATE_STATISTIC_SUCCESS = 'UPDATE_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type UpdateStatisticAction = BaseAction & {
  sheetIdentifier: string,
  statistic: Statistic
};
export function updateStatistic(sheetIdentifier: string, statistic: Statistic): UpdateStatisticAction {
  return { type: UPDATE_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleUpdateStatistic(updateStatisticAction: UpdateStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = updateStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));
  let oldStatistics = sheetToUpdate.statistics || [];
  const oldStatistic = oldStatistics.find(o => o.name === statistic.name);

  if (oldStatistic) {
    const index = oldStatistics.indexOf(oldStatistic);
    oldStatistics[index] = statistic;
  } else {
    oldStatistics = [...oldStatistics, statistic];
  }

  sheetToUpdate.statistics = oldStatistics;
  
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

// ADD STATISTIC
export const ADD_STATISTIC_SUCCESS = 'ADD_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type AddStatisticAction = BaseAction & {
  sheetIdentifier: string,
  statistic: Statistic
};
export function addStatistic(sheetIdentifier: string, statistic: Statistic): AddStatisticAction {
  return { type: ADD_STATISTIC_SUCCESS, sheetIdentifier, statistic };
}
export function handleAddStatistic(addStatisticAction: AddStatisticAction, state: SheetState) {
  const { sheetIdentifier, statistic } = addStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));

  let oldStatistics = sheetToUpdate.statistics || [];
  
  sheetToUpdate.statistics = [...oldStatistics, statistic];
  
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

// DELETE STATISTIC
export const DELETE_STATISTIC_SUCCESS = 'DELETE_STATISTIC' + SHEET_SUCCESS_SUFFIX;
export type DeleteStatisticAction = BaseAction & {
  sheetIdentifier: string,
  statisticName: string
};
export function deleteStatistic(sheetIdentifier: string, statisticName: string): DeleteStatisticAction {
  return { type: DELETE_STATISTIC_SUCCESS, sheetIdentifier, statisticName };
}
export function handleDeleteStatistic(deleteStatisticAction: DeleteStatisticAction, state: SheetState) {
  const { sheetIdentifier, statisticName } = deleteStatisticAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));

  let oldStatistics = sheetToUpdate.statistics || [];
  
  sheetToUpdate.statistics = oldStatistics.filter(o => o.name !== statisticName);
  
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

// CREATE
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
    Object.assign({}, createAction.sheet)
    ]
  };
}

// UPDATE
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
      ...state.sheets.filter(sheet => sheet.identifier !== updateAction.sheet.identifier),
      Object.assign({}, updateAction.sheet)
    ]
  };
}

// DELETE
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
      ...state.sheets.filter(sheet => sheet.identifier !== deleteAction.sheetIdentifier)
    ]
  };
}

// LOAD
export const LOAD_SHEET_SUCCESS = 'LOAD' + SHEET_SUCCESS_SUFFIX;
export type LoadSheetsAction = BaseAction & {
  sheets: Sheet[]
};
export function loadSheets(sheets: Sheet[]): LoadSheetsAction {
  return { type: LOAD_SHEET_SUCCESS, sheets };
}
export function handleLoadSheets(loadAction: LoadSheetsAction) {
  return { sheets: loadAction.sheets };
}

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