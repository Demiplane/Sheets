import RootAction from '../core/RootAction';
import { ActionHandler } from './ActionRegistry';

export default function actionHandlerReducer<TAction extends RootAction, TState>(
  state: TState,
  action: TAction,
  handlers: ActionHandler<TAction, TState>[]): TState {
  const handler = handlers.find(h => h.type === action.type);
  return handler ? handler.handle(action, state) : state;
}