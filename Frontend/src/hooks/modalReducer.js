const modalState = {
  show: false,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_CLOSE':
      return { ...state, show: false };
    case 'HANDLE_OPEN':
      return { ...state, show: true }
    default:
      return state;
  }
};

export { modalState, modalReducer }
