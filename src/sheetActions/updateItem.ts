import { Item } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM' + SHEET_SUCCESS_SUFFIX;
export type UpdateItemAction = BaseAction & {
  sheetIdentifier: string,
  item: Item  
};
export function updateItem(sheetIdentifier: string, item: Item): UpdateItemAction {
  return { type: UPDATE_ITEM_SUCCESS, sheetIdentifier, item };
}
export function handleUpdateItem(updateItemAction: UpdateItemAction, state: SheetState) {
  const { sheetIdentifier, item } = updateItemAction;

  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.name === sheetIdentifier));
  const oldInventory = sheetToUpdate.inventory || [];
  const oldItem = oldInventory.find(i => i.name === item.name);

  let newInventory = [...oldInventory];

  if (oldItem) {
    const index = oldInventory.indexOf(oldItem);
    newInventory[index] = item;
  } else {
    newInventory = [...newInventory, item];
  }

  sheetToUpdate.inventory = newInventory;

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.name !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  UPDATE_ITEM_SUCCESS,
  handleUpdateItem
);