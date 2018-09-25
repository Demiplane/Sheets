import { Dispatch, AnyAction } from 'redux';
import Sheet from '../sheet/SheetModel';
import { createSheet } from '../sheetActions/createSheet';
import { updateSheet } from '../sheetActions/updateSheet';
import { deleteSheet } from '../sheetActions/deleteSheet';
import { loadSheets } from '../sheetActions/loadSheets';
import { renameSheet } from '../sheetActions/renameSheet';

export type ConnectedSheetProps = {
  
  createSheet?: (sheet: Sheet) => void;
  updateSheet?: (sheet: Sheet) => void;
  deleteSheet?: (sheetIdentifier: string) => void;
  loadSheets?: (sheets: Sheet[]) => void;
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
    loadSheets: (sheets: Sheet[]) =>
      dispatch(loadSheets(sheets)),
    renameSheet: (sheetIdentifier: string, name: string) =>
      dispatch(renameSheet(sheetIdentifier, name))

  };
}