const initialState = {
  searchResults: [],
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export { initialState, searchReducer }
