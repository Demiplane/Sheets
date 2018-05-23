import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add } from '../sheet/sheetActions';

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM' + SHEET_SUCCESS_SUFFIX;
export type DeleteItemAction = BaseAction & {
  sheetIdentifier: number,
  itemIdentifier: number
};
export function deleteItem(sheetIdentifier: number, itemIdentifier: number): DeleteItemAction {
  return { type: DELETE_ITEM_SUCCESS, sheetIdentifier, itemIdentifier };
}
export function handleDeleteItem(deleteItemAction: DeleteItemAction, state: SheetState) {
  const { sheetIdentifier, itemIdentifier } = deleteItemAction;

  const sheetToUpdate = Object.assign({}, state.sheets.find(s => s.id === sheetIdentifier));
  let oldInventory = sheetToUpdate.inventory || [];
  const newInventory = oldInventory.filter(i => i.id !== itemIdentifier);

  sheetToUpdate.inventory = newInventory;

  return {
    sheets: [
      ...state.sheets.filter(sheet => sheet.id !== sheetIdentifier),
      Object.assign({}, sheetToUpdate)
    ]
  };
}

add(
  DELETE_ITEM_SUCCESS,
  handleDeleteItem
);