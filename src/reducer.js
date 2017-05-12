
function userReducer(
  state = {
    submit: false,
    inputText: '',
    retData: {},
    receivedData: false,
    buttonBox: {
      loading: false
    }
  }, action) {
  switch (action.type) {
    case 'submit':
      return {
        submit: true,
        inputText: state.inputText,
        retData: action.retData,
        receivedData: action.receivedData
      }
    case 'input':
      return { inputText: action.inputText}
    case 'enterLoading':
      return {
        buttonBox: {
          loading: true
        }
      }
    case 'fnishLoading':
      return {
        buttonBox: {
          loading: false
        }
      }
    case 'fetchCompareData':
      return {
        retData : action.retData
      }
    default:
      return state
  }
};

export default userReducer;
