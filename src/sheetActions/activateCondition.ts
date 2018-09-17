import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

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

  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.activateCondition(condition))
  };
}

add(ACTIVATE_CONDITION_SHEET_SUCCESS, handleActivateCondition);