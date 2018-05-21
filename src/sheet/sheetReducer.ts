import initialState from '../core/initialState';
import SheetState from './SheetState';
import RootAction from '../core/RootAction';
import actionHandlerReducer from '../core/actionHandlerReducer';
import { statisticValueCache } from './SheetModel';
import { activateConditionHandler } from '../sheetActions/activateCondition';
import { SHEET_SUCCESS_SUFFIX } from './sheetActions';
import { inactivateConditionHandler } from '../sheetActions/inactivateCondition';
import { addStatisticHandler } from '../sheetActions/addStatistic';
import { createSheetHandler } from '../sheetActions/createSheet';
import { deleteSheetHandler } from '../sheetActions/deleteSheet';
import { updateSheetHandler } from '../sheetActions/updateSheet';
import { updateStatisticHandler } from '../sheetActions/updateStatistic';
import { loadSheetsHandler } from '../sheetActions/loadSheets';
import { deleteStatisticHandler } from '../sheetActions/deleteStatistic';

export default function sheetReducer(state: SheetState = initialState.sheetState, action: RootAction): SheetState {
  if (action.type.endsWith(SHEET_SUCCESS_SUFFIX)) {
    statisticValueCache.clear();
  }

  return actionHandlerReducer(state, action, [
    activateConditionHandler,
    inactivateConditionHandler,
    
    updateStatisticHandler,
    addStatisticHandler,
    deleteStatisticHandler,

    createSheetHandler,
    deleteSheetHandler,
    updateSheetHandler,
    loadSheetsHandler]);

  // switch (action.type) {

  //   case ACTIVATE_CONDITION_SHEET_SUCCESS:
  //     return handleActivateCondition(<ActivateConditionAction>action, state);
  //   case INACTIVATE_CONDITION_SHEET_SUCCESS:
  //     return handleInactivateCondition(<InactivateConditionAction>action, state);
  //   case CREATE_SHEET_SUCCESS:
  //     return handleCreateSheet(<CreateSheetAction>action, state);
  //   case UPDATE_SHEET_SUCCESS:
  //     return handleUpdateSheet(<UpdateSheetAction>action, state);
  //   case DELETE_SHEET_SUCCESS:
  //     return handleDeleteSheet(<DeleteSheetAction>action, state);
  //   case LOAD_SHEET_SUCCESS:
  //     return handleLoadSheets(<LoadSheetsAction>action);

  //   default:
  //     return state;
  // }
}