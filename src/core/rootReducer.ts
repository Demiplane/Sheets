import { combineReducers } from 'redux';
import RootState from './RootState';
import RootAction from './RootAction';
import sheetReducer from '../sheet/sheetReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers<RootState, RootAction>(
  {
    sheetState: sheetReducer,
    loading: loadingReducer
  });

export default rootReducer;