import { Item } from '../sheet/SheetModel';
import { BaseAction } from '../core/BaseAction';
import SheetState from '../sheet/SheetState';
import { SHEET_SUCCESS_SUFFIX } from '../sheet/sheetActions';
import { add, executeTransition } from '../sheet/sheetActions';

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

  return {
    sheets: executeTransition(sheetIdentifier, state.sheets, s => s.updateItem(item))
  };
}

add(
  UPDATE_ITEM_SUCCESS,
  handleUpdateItem
);