import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

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
  const prevSheet = state.sheets.find(s => s.name === sheetIdentifier);

  if (!prevSheet){
    console.log('activateCondition', 'warn', 'Could not find sheet:', sheetIdentifier);
    return state;
  }

  const sheetToUpdate = Object.assign({}, prevSheet);
  sheetToUpdate.conditions = [...prevSheet.conditions]
  
  const oldConditionIndex = sheetToUpdate.conditions.findIndex(c => c.name === condition);

  if (oldConditionIndex >= 0) {
    sheetToUpdate.conditions[oldConditionIndex] = Object.assign({}, sheetToUpdate.conditions[oldConditionIndex], {active:false});
  }

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  INACTIVATE_CONDITION_SHEET_SUCCESS,
  handleInactivateCondition
);