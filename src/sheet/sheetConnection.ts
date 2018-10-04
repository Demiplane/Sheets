import { Dispatch, AnyAction } from 'redux';
import Sheet from '../sheet/SheetModel';
import { createSheet } from '../sheetActions/createSheet';
import { updateSheet } from '../sheetActions/updateSheet';
import { deleteSheet } from '../sheetActions/deleteSheet';
import { loadSheets } from '../sheetActions/loadSheets';
import { renameSheet } from '../sheetActions/renameSheet';
import { loadSheet } from '../sheetActions/loadSheet';

export type ConnectedSheetProps = {

  createSheet?: (sheet: Sheet) => void;
  updateSheet?: (sheet: Sheet) => void;
  deleteSheet?: (sheetIdentifier: string) => void;
  loadSheets?: (sheets: Sheet[]) => void;
  loadSheet?: (sheet: Sheet) => void;
  renameSheet?: (sheetIdentifier: string, name: string) => void;

};

export function mapSheetActions(dispatch: Dispatch<AnyAction>): ConnectedSheetProps {
  return {

    createSheet: (sheet: Sheet) =>
      dispatch(createSheet(sheet)),
    updateSheet: (sheet: Sheet) =>
      dispatch(updateSheet(sheet)),
    deleteSheet: (sheetIdentifier: string) =>
      dispatch(deleteSheet(sheetIdentifier)),
    loadSheets: (sheets: Sheet[]) => {
      console.log('dispatch');
      dispatch(loadSheets(sheets));
    },
    loadSheet: (sheet: Sheet) => {
      console.log('dispatch');
      dispatch(loadSheet(sheet));
    },
    renameSheet: (sheetIdentifier: string, name: string) =>
      dispatch(renameSheet(sheetIdentifier, name))

  };
}