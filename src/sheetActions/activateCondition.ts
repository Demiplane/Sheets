import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

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
  const prevSheet = state.sheets.find(s => s.name === sheetIdentifier);

  if (!prevSheet){
    console.log('activateCondition', 'warn', 'Could not find sheet:', sheetIdentifier);
    return state;
  }

  const sheetToUpdate = Object.assign({}, prevSheet);
  sheetToUpdate.conditions = [...prevSheet.conditions]
  
  const oldConditionIndex = sheetToUpdate.conditions.findIndex(c => c.name === condition);

  if (oldConditionIndex >= 0) {
    sheetToUpdate.conditions[oldConditionIndex] = Object.assign({}, sheetToUpdate.conditions[oldConditionIndex], {active:true});
  }

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(ACTIVATE_CONDITION_SHEET_SUCCESS, handleActivateCondition);