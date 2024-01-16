const initialFilterState = {
  filterResults: [],
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER_RESULTS':
      return{ ...state, filterResults: action.payload.filterResults.items };
    case 'CLEAR_BOOK_RESULTS':
      return { ...state, filterResults: []};
    default:
      return state;
  }
};

export { initialFilterState, filterReducer }
