const loginState = {
  loginState: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return{ ...state, isLoggedIn: action.payload};
    case 'SET_LOGOUT':
      return { ...state, isLoggedIn: action.payload};
    default:
      return state;
  }
};

export { loginState, loginReducer }
