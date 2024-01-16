const loginState = {
  loginState: "",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return{ ...state, loginState: action.payload};
    case 'SET_LOGOUT':
        return { ...state, loginState: "" };
      
    default:
      return state;
  }
};

export { loginState, loginReducer }
