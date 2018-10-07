import { combineReducers } from 'redux';
import RootState from './RootState';
import RootAction from './RootAction';
import sheetReducer from '../sheet/sheetReducer';
import loadingReducer from './loadingReducer';
import sheetHistoryReducer from './sheetHistoryReducer';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { UNDO_SHEET } from '../sheetActions/undoSheet';
import { REDO_SHEET } from '../sheetActions/redoSheet';

const rootReducer = (state: RootState, action: RootAction): RootState => {
  const generalReducer = combineReducers<RootState, RootAction>(
    {
      sheetState: sheetReducer,
      sheetHistoryState: sheetHistoryReducer,
      loading: loadingReducer
    });

  var reducedState = generalReducer(state, action);

  console.log(action.type);

  if (action.type.endsWith(SHEET_SUCCESS_SUFFIX) && !action.type.startsWith('LOAD')) {
    reducedState.sheetHistoryState.past.push(state.sheetState);
    console.log(reducedState.sheetHistoryState);
  } else if (action.type === UNDO_SHEET && reducedState.sheetHistoryState.past.length > 0) {
    reducedState.sheetHistoryState.future.push(reducedState.sheetState);
    reducedState.sheetState = reducedState.sheetHistoryState.past.pop()!;
    console.log(reducedState.sheetHistoryState);
  } else if (action.type === REDO_SHEET && reducedState.sheetHistoryState.future.length > 0) {
    reducedState.sheetHistoryState.past.push(reducedState.sheetState);
    reducedState.sheetState = reducedState.sheetHistoryState.future.pop()!;
    console.log(reducedState.sheetHistoryState);
  }

  return reducedState;
};

export default rootReducer;