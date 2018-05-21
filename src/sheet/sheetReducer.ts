import initialState from '../core/initialState';
import SheetState from './SheetState';
import RootAction from '../core/RootAction';
import actionHandlerReducer from '../core/actionHandlerReducer';
import { SHEET_SUCCESS_SUFFIX } from './sheetActions';
import { ActionHandler, ActionRegistry } from '../core/ActionRegistry';
import { statisticValueCache } from './SheetModel';

const registry: { handlers: ActionHandler<RootAction, SheetState>[] } = { handlers: [] };

export function add<TAction extends RootAction>(
  type: string,
  actionFunction: (activateAction: TAction, state: SheetState) => SheetState) {
  registry.handlers = [...registry.handlers, new ActionRegistry<RootAction, TAction, SheetState>(type, actionFunction)];
}

export default function sheetReducer(state: SheetState = initialState.sheetState, action: RootAction): SheetState {
  if (action.type.endsWith(SHEET_SUCCESS_SUFFIX)) {
    statisticValueCache.clear();
  }

  return actionHandlerReducer(state, action, registry.handlers);

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