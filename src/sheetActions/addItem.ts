import { Item } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

export const ADD_ITEM_SUCCESS = 'ADD_ITEM' + SHEET_SUCCESS_SUFFIX;
export type AddItemAction = BaseAction & {
  sheetIdentifier: string,
  item: Item  
};
export function addItem(sheetIdentifier: string, item: Item): AddItemAction {
  return { type: ADD_ITEM_SUCCESS, sheetIdentifier, item };
}
export function handleAddItem(addItemAction: AddItemAction, state: SheetState) {
  const { sheetIdentifier, item } = addItemAction;

  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.addItem(item))
  };
}

add(
  ADD_ITEM_SUCCESS,
  handleAddItem
);