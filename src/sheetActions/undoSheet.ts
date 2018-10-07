import { BaseAction } from '../core/BaseAction';

export const UNDO_SHEET = 'UNDO_SHEET';
export type UndoSheetAction = BaseAction;

export function undo(): UndoSheetAction {
  return { type: UNDO_SHEET };
}