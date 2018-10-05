import RootAction from '../core/RootAction';
import SheetState from './SheetState';
import ActionRegistry, { ActionHandler } from '../core/ActionRegistry';
import Sheet from './SheetModel';

export const SHEET_SUCCESS_SUFFIX = '_SHEET_SUCCESS';
export const registry: { handlers: ActionHandler<RootAction, SheetState>[] } = { handlers: [] };

export function add<TAction extends RootAction>(
  type: string,
  actionFunction: (activateAction: TAction, state: SheetState) => SheetState) {

  registry.handlers = [...registry.handlers,
  new ActionRegistry<RootAction, TAction, SheetState>(type, actionFunction)];
}

export function executeTransition(
  sheetIdentifier: string,
  sheets: Sheet[], transition: (found: Sheet) => Sheet): Sheet[] {

  const prevSheet = sheets.find(s => s.name === sheetIdentifier);

  if (!prevSheet) {
    return sheets;
  }

  return [
    ...sheets.filter(sheet => sheet.name !== sheetIdentifier),
    transition(prevSheet)
  ];
}
