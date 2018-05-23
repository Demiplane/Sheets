import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const INACTIVATE_CONDITION_SHEET_SUCCESS = 'INACTIVATE_CONDITION' + SHEET_SUCCESS_SUFFIX;
export type InactivateConditionAction = BaseAction & {
  sheetIdentifier: number,
  condition: string
};
export function inactivateCondition(sheetIdentifier: number, condition: string): InactivateConditionAction {
  return { type: INACTIVATE_CONDITION_SHEET_SUCCESS, sheetIdentifier, condition };
}
export function handleInactivateCondition(inactivateAction: InactivateConditionAction, state: SheetState) {
  const { sheetIdentifier, condition } = inactivateAction;
  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.id === sheetIdentifier));
  sheetToUpdate.conditions = sheetToUpdate.conditions.filter(c => c !== condition);
  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.id !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  INACTIVATE_CONDITION_SHEET_SUCCESS,
  handleInactivateCondition
);