import initialState from '../core/initialState';
import SheetState from './SheetState';
import RootAction from '../core/RootAction';
import * as Actions from './sheetActions';
import * as SheetActions from './sheetActions';
import { statisticValueCache } from './sheetModel';

export default function sheetReducer(state: SheetState = initialState.sheetState, action: RootAction): SheetState {
    if (action.type.endsWith(SheetActions.SHEET_SUCCESS_SUFFIX)) {
        statisticValueCache.clear();
    }

    switch (action.type) {
        case SheetActions.CREATE_SHEET_SUCCESS:
            var createAction = <Actions.CreateSheetAction>action;
            return {
                sheets: [...state.sheets,
                Object.assign({}, createAction.sheet)
                ]
            };
        case SheetActions.UPDATE_SHEET_SUCCESS:
            var updateAction = <Actions.UpdateSheetAction>action;
            return {
                sheets: [
                    ...state.sheets.filter(sheet => sheet.identifier !== updateAction.sheet.identifier),
                    Object.assign({}, updateAction.sheet)
                ]
            };
        case SheetActions.DELETE_SHEET_SUCCESS:
            var deleteAction = <Actions.DeleteSheetAction>action;
            return {
                sheets: [
                    ...state.sheets.filter(sheet => sheet.identifier !== deleteAction.sheetIdentifier)
                ]
            };
        case SheetActions.LOAD_SHEET_SUCCESS:
            var loadAction = <Actions.LoadSheetsAction>action;
            return { sheets: loadAction.sheets };
        default:
            return state;
    }
}