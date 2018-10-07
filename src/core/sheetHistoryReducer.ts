import initialState from '../core/initialState';
import RootAction from '../core/RootAction';
import SheetHistoryState from '../sheet/SheetHistoryState';

export default function sheetHistoryReducer(
  state: SheetHistoryState = initialState.sheetHistoryState, 
  action: RootAction): SheetHistoryState {
  return {
    future: [...state.future],
    past: [...state.past]
  };
}