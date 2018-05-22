import RootAction from '../core/RootAction';
import SheetState from './SheetState';
import ActionRegistry, { ActionHandler } from '../core/ActionRegistry';

export const SHEET_SUCCESS_SUFFIX = '_SHEET_SUCCESS';
export const registry: { handlers: ActionHandler<RootAction, SheetState>[] } = { handlers: [] };

export function add<TAction extends RootAction>(
  type: string,
  actionFunction: (activateAction: TAction, state: SheetState) => SheetState) {
  registry.handlers = [...registry.handlers, new ActionRegistry<RootAction, TAction, SheetState>(type, actionFunction)];
}