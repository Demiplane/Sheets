import RootAction from './RootAction';

export interface ActionHandler<TAction, TState> {
  type: string;
  handle(action: TAction, state: TState): TState;
}

export class ActionRegistry<T extends RootAction, TState> implements ActionHandler<RootAction, TState> {
  type: string;
  actionFunction: (activateAction: T, state: TState) => TState;

  constructor(type: string, actionFunction: (activateAction: T, state: TState) => TState) {
    this.type = type;
    this.actionFunction = actionFunction;
  }

  handle(action: RootAction, state: TState): TState {
    const specificAction = <T>action;
    return this.actionFunction(specificAction, state);
  }
}

export default ActionRegistry;