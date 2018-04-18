import * as SheetActions from '../sheet/sheetActions';

type RootAction = 
    SheetActions.CreateSheetAction |
    SheetActions.DeleteSheetAction |
    SheetActions.UpdateSheetAction |
    SheetActions.LoadSheetsAction;

export default RootAction;