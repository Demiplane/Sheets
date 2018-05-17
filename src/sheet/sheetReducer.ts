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

    case SheetActions.ACTIVATE_CONDITION_SHEET_SUCCESS:
      return SheetActions.handleActivateCondition(<SheetActions.ActivateConditionAction>action, state);
    case SheetActions.INACTIVATE_CONDITION_SHEET_SUCCESS:
      return SheetActions.handleInactivateCondition(<SheetActions.InactivateConditionAction>action, state);
    case SheetActions.CREATE_SHEET_SUCCESS:
      return SheetActions.handleCreateSheet(<SheetActions.CreateSheetAction>action, state);
    case SheetActions.UPDATE_SHEET_SUCCESS:
      return SheetActions.handleUpdateSheet(<SheetActions.UpdateSheetAction>action, state);
    case SheetActions.DELETE_SHEET_SUCCESS:
      return SheetActions.handleDeleteSheet(<SheetActions.DeleteSheetAction>action, state);
    case SheetActions.LOAD_SHEET_SUCCESS:
      return SheetActions.handleLoadSheets(<SheetActions.LoadSheetsAction>action);

    default:
      return state;
  }
}