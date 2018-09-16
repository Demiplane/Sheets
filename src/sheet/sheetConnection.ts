import { Dispatch, AnyAction } from 'redux';
import Sheet, { Statistic, Item } from '../sheet/SheetModel';
import { activateCondition } from '../sheetActions/activateCondition';
import { inactivateCondition } from '../sheetActions/inactivateCondition';
import { updateStatistic } from '../sheetActions/updateStatistic';
import { addStatistic } from '../sheetActions/addStatistic';
import { deleteStatistic } from '../sheetActions/deleteStatistic';
import { createSheet } from '../sheetActions/createSheet';
import { updateSheet } from '../sheetActions/updateSheet';
import { deleteSheet } from '../sheetActions/deleteSheet';
import { loadSheets } from '../sheetActions/loadSheets';
import { renameSheet } from '../sheetActions/renameSheet';
import { addItem } from '../sheetActions/addItem';
import { updateItem } from '../sheetActions/updateItem';
import { deleteItem } from '../sheetActions/deleteItem';

export type ConnectedSheetProps = {
  activateCondition?: (sheetIdentifier: string, condition: string) => void;
  inactivateCondition?: (sheetIdentifier: string, condition: string) => void;

  updateStatistic?: (sheetIdentifier: string, statistic: Statistic) => void;
  addStatistic?: (sheetIdentifier: string, statistic: Statistic) => void;
  deleteStatistic?: (sheetIdentifier: string, statistic: Statistic) => void;

  addItem?: (sheetIdentifier: string, item: Item) => void;
  updateItem?: (sheetIdentifier: string, item: Item) => void;
  deleteItem?: (sheetIdentifier: string, itemIdentifier: string) => void;

  createSheet?: (sheet: Sheet) => void;
  updateSheet?: (sheet: Sheet) => void;
  deleteSheet?: (sheetIdentifier: string) => void;
  loadSheets?: (sheets: Sheet[]) => void;
  renameSheet?: (sheetIdentifier: string, name: string) => void;
};

export function mapSheetActions(dispatch: Dispatch<AnyAction>): ConnectedSheetProps {
  return {
    activateCondition: (sheetIdentifier: string, condition: string) =>
      dispatch(activateCondition(sheetIdentifier, condition)),
    inactivateCondition: (sheetIdentifier: string, condition: string) =>
      dispatch(inactivateCondition(sheetIdentifier, condition)),

    updateStatistic: (sheetIdentifier: string, statistic: Statistic) =>
      dispatch(updateStatistic(sheetIdentifier, statistic)),
    addStatistic: (sheetIdentifier: string, statistic: Statistic) =>
      dispatch(addStatistic(sheetIdentifier, statistic)),
    deleteStatistic: (sheetIdentifier: string, statistic: Statistic) =>
      dispatch(deleteStatistic(sheetIdentifier, statistic)),

    createSheet: (sheet: Sheet) =>
      dispatch(createSheet(sheet)),
    updateSheet: (sheet: Sheet) =>
      dispatch(updateSheet(sheet)),
    deleteSheet: (sheetIdentifier: string) =>
      dispatch(deleteSheet(sheetIdentifier)),
    loadSheets: (sheets: Sheet[]) =>
      dispatch(loadSheets(sheets)),
    renameSheet: (sheetIdentifier: string, name: string) =>
      dispatch(renameSheet(sheetIdentifier, name)),

    addItem: (sheetIdentifier: string, item: Item) =>
      dispatch(addItem(sheetIdentifier, item)),
    updateItem: (sheetIdentifier: string, item: Item) =>
      dispatch(updateItem(sheetIdentifier, item)),
    deleteItem: (sheetIdentifier: string, itemIdentifier: string) =>
      dispatch(deleteItem(sheetIdentifier, itemIdentifier))
  };
}