import RootState from '../core/RootState';

const initialState: RootState = {
  sheetState: {
    sheets: []
  },
  sheetHistoryState: {
    future: [],
    past: []
  },
  loading: true
};

export default initialState;