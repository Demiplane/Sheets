import { BaseAction } from '../core/BaseAction';

export const REDO_SHEET = 'REDO_SHEET';
export type RedoSheetAction = BaseAction;

export function redo(): RedoSheetAction {
  return { type: REDO_SHEET };
}