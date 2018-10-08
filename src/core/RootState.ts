import SheetState from '../sheet/SheetState';
import SheetHistoryState from '../sheet/SheetHistoryState';

type RootState = {
  sheetState: SheetState,
  sheetHistoryState: SheetHistoryState,
  loading: boolean
};

export default RootState;