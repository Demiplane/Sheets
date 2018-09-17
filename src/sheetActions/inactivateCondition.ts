import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

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
  
  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.inactivateCondition(condition))
  };
}

add(
  INACTIVATE_CONDITION_SHEET_SUCCESS,
  handleInactivateCondition
);