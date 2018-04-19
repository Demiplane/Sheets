import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import initialState from './initialState';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, reduxImmutableStateInvariant)
    );
}