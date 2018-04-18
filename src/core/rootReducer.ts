import { combineReducers } from 'redux';
import RootState from './RootState';
import RootAction from './RootAction';
import sheetReducer from '../sheet/sheetReducer';

const rootReducer = combineReducers<RootState, RootAction>(
    {
        sheetState: sheetReducer
    });

export default rootReducer;