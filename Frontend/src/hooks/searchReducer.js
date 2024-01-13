const initialState = {
  searchResults: [],
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      const newState = { ...state, searchResults: action.payload.searchResults.items };
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export { initialState, searchReducer }
