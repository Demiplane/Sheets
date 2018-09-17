import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM' + SHEET_SUCCESS_SUFFIX;
export type DeleteItemAction = BaseAction & {
  sheetIdentifier: string,
  itemIdentifier: string
};
export function deleteItem(sheetIdentifier: string, itemIdentifier: string): DeleteItemAction {
  return { type: DELETE_ITEM_SUCCESS, sheetIdentifier, itemIdentifier };
}
export function handleDeleteItem(deleteItemAction: DeleteItemAction, state: SheetState) {
  const { sheetIdentifier, itemIdentifier } = deleteItemAction;
  
  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.deleteItem(itemIdentifier))
  };
}

add(
  DELETE_ITEM_SUCCESS,
  handleDeleteItem
);