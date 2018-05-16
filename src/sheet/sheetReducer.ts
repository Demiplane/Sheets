import initialState from '../core/initialState';
import SheetState from './SheetState';
import RootAction from '../core/RootAction';
import * as SheetActions from './sheetActions';
import { statisticValueCache } from './SheetModel';

export default function sheetReducer(state: SheetState = initialState.sheetState, action: RootAction): SheetState {
  if (action.type.endsWith(SheetActions.SHEET_SUCCESS_SUFFIX)) {
    statisticValueCache.clear();
  }

  switch (action.type) {

    case SheetActions.CREATE_SHEET_SUCCESS:
      const createAction = <SheetActions.CreateSheetAction>action;
      return {
        sheets: [...state.sheets,
        Object.assign({}, createAction.sheet)
        ]
      };
    case SheetActions.UPDATE_SHEET_SUCCESS:
      const updateAction = <SheetActions.UpdateSheetAction>action;
      return {
        sheets: [
          ...state.sheets.filter(sheet => sheet.identifier !== updateAction.sheet.identifier),
          Object.assign({}, updateAction.sheet)
        ]
      };
    case SheetActions.DELETE_SHEET_SUCCESS:
      const deleteAction = <SheetActions.DeleteSheetAction>action;
      return {
        sheets: [
          ...state.sheets.filter(sheet => sheet.identifier !== deleteAction.sheetIdentifier)
        ]
      };
    case SheetActions.LOAD_SHEET_SUCCESS:
      const loadAction = <SheetActions.LoadSheetsAction>action;
      return { sheets: loadAction.sheets };
    default:
      return state;
  }
}