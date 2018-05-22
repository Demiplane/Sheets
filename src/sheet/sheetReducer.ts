import initialState from '../core/initialState';
import SheetState from './SheetState';
import RootAction from '../core/RootAction';
import actionHandlerReducer from '../core/actionHandlerReducer';
import { statisticValueCache } from './SheetModel';
import { SHEET_SUCCESS_SUFFIX, registry } from './sheetActions';

export default function sheetReducer(state: SheetState = initialState.sheetState, action: RootAction): SheetState {
  if (action.type.endsWith(SHEET_SUCCESS_SUFFIX)) {
    statisticValueCache.clear();
  }

  return actionHandlerReducer(state, action, registry.handlers);
}