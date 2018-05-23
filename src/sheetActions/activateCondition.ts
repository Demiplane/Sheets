import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { distinct } from '../core/distinct';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const ACTIVATE_CONDITION_SHEET_SUCCESS = 'ACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export type ActivateConditionAction = BaseAction & {
  sheetIdentifier: number,
  condition: string
};
export function activateCondition(sheetIdentifier: number, condition: string): ActivateConditionAction {
  return { type: ACTIVATE_CONDITION_SHEET_SUCCESS, sheetIdentifier, condition };
}
export function handleActivateCondition(activateAction: ActivateConditionAction, state: SheetState) {
  const { sheetIdentifier, condition } = activateAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.id === sheetIdentifier));
  sheetToUpdate.conditions = distinct(sheetToUpdate.conditions.concat(condition));
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.id !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(ACTIVATE_CONDITION_SHEET_SUCCESS, handleActivateCondition);