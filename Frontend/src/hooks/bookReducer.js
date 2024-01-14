const initialBookState = {
  bookResults: [],
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOK_RESULTS':
      return{ ...state, bookResults: action.payload.catalogueResults.items };
    case 'CLEAR_BOOK_RESULTS':
      return { ...state, bookResults: [] };
    default:
      return state;
  }
};

export { initialBookState, bookReducer }
