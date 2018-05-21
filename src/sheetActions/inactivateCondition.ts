import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import ActionRegistry from '../core/ActionRegistry';

// INACTIVATE CONDITION
export const INACTIVATE_CONDITION_SHEET_SUCCESS = 'INACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export type InactivateConditionAction = BaseAction & {
  sheetIdentifier: string,
  condition: string
};
export function inactivateCondition(sheetIdentifier: string, condition: string): InactivateConditionAction {
  return { type: INACTIVATE_CONDITION_SHEET_SUCCESS, sheetIdentifier, condition };
}
export function handleInactivateCondition(inactivateAction: InactivateConditionAction, state: SheetState) {
  const { sheetIdentifier, condition } = inactivateAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.identifier === sheetIdentifier));
  sheetToUpdate.conditions = sheetToUpdate.conditions.filter(c => c !== condition);
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.identifier !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

export const inactivateConditionHandler = new ActionRegistry<InactivateConditionAction, SheetState>(
  INACTIVATE_CONDITION_SHEET_SUCCESS,
  handleInactivateCondition
  );