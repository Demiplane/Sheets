import initialState from '../core/initialState';
import RootAction from '../core/RootAction';

export default function loadingReducer(state: boolean = initialState.loading, action: RootAction): boolean {
  const newState = action.type.startsWith('LOAD') ? false : state;

  return newState;
}