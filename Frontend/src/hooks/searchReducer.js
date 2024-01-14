const initialState = {
  searchResults: [],
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      const newState = { ...state, searchResults: action.payload };
      console.log(newState);
      return newState;
      // return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export { initialState, searchReducer }
