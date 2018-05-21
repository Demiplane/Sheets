export interface ActionHandler<TRootAction, TState> {
  type: string;
  handle(action: TRootAction, state: TState): TState;
}

export class ActionRegistry<TRootAction, TAction extends TRootAction, TState> 
  implements ActionHandler<TRootAction, TState> {
  type: string;
  actionFunction: (activateAction: TAction, state: TState) => TState;

  constructor(type: string, actionFunction: (activateAction: TAction, state: TState) => TState) {
    this.type = type;
    this.actionFunction = actionFunction;
  }

  handle(action: TRootAction, state: TState): TState {
    const specificAction = <TAction>action;
    return this.actionFunction(specificAction, state);
  }
}

export default ActionRegistry;