import { CreateSheetAction } from '../sheetActions/createSheet';
import { DeleteSheetAction } from '../sheetActions/deleteSheet';
import { UpdateSheetAction } from '../sheetActions/updateSheet';
import { LoadSheetsAction } from '../sheetActions/loadSheets';
import { RenameSheetAction } from '../sheetActions/renameSheet';

type RootAction =
  CreateSheetAction |
  DeleteSheetAction |
  UpdateSheetAction |
  LoadSheetsAction |
  RenameSheetAction;

export default RootAction;