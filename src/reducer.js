
function userReducer(
  state = {
    submit: false,
    inputText: ''
  }, action) {
  switch (action.type) {
    case 'submit':
      return { submit: true, inputText: state.inputText }
    case 'input':
      return { inputText: action.inputText}
    default:
      return state
  }
};

export default userReducer;
