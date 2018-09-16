import initialState from '../core/initialState';
import SheetState from './SheetState';
import RootAction from '../core/RootAction';
import actionHandlerReducer from '../core/actionHandlerReducer';
import { registry } from './sheetActions';

export default function sheetReducer(state: SheetState = initialState.sheetState, action: RootAction): SheetState {
  return actionHandlerReducer(state, action, registry.handlers);
}