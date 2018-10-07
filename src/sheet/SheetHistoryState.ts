import SheetState from './SheetState';

type SheetHistoryState = {
  future: SheetState[];
  past: SheetState[];
};

export default SheetHistoryState;