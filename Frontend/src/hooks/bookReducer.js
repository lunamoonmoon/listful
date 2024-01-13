const initialBookState = {
  bookResults: [],
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOK_RESULTS':
      const newState = { ...state, bookResults: action.payload.searchResults.items };
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export { initialBookState, bookReducer }
