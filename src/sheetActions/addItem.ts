import { Item } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

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

  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.name === sheetIdentifier));
  const oldInventory = sheetToUpdate.inventory || [];
  const newInventory = [...oldInventory, item];

  sheetToUpdate.inventory = newInventory;

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  ADD_ITEM_SUCCESS,
  handleAddItem
);