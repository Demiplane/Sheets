import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { distinct } from '../core/distinct';
import { ActionRegistry } from '../core/ActionRegistry';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';

// ACTIVATE CONDITION
export const ACTIVATE_CONDITION_SHEET_SUCCESS = 'ACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export type ActivateConditionAction = BaseAction & {
  sheetIdentifier: string,
  condition: string
};
export function activateCondition(sheetIdentifier: string, condition: string): ActivateConditionAction {
  return { type: ACTIVATE_CONDITION_SHEET_SUCCESS, sheetIdentifier, condition };
}
export function handleActivateCondition(activateAction: ActivateConditionAction, state: SheetState) {
  const { sheetIdentifier, condition } = activateAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));
  sheetToUpdate.conditions = distinct(sheetToUpdate.conditions.concat(condition));
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

export const activateConditionHandler = new ActionRegistry<ActivateConditionAction, SheetState>(
  ACTIVATE_CONDITION_SHEET_SUCCESS,
  handleActivateCondition
  );