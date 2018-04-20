import { createStore } from 'redux';
import rootReducer from './rootReducer';
import initialState from './initialState';
import RootState from './RootState';

export default function configureStore(state: RootState = initialState) {
    return createStore(
        rootReducer,
        initialState
    );
}