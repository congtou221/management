function userReducer(
  state = {
    submit: false,
    retData: [],
    formBox:{
        visible: false,
        form: {}
    },
    historyFormBox:{
        visible: false,
        form: {}
    }
  }, action) {
  switch (action.type) {
    case 'saveFormRef':
      return {
        submit: true,
        retData: state.retData,
        formBox:{
          visible:state.formBox.visible,
          form: action.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'showModal':
      return {
        submit: true,
        retData: state.retData,
        formBox:{
          visible: true,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'cancel':
      return {
        submit: true,
        retData: state.retData,
        formBox: {
          visible: false,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'create':
      return {
        submit: true,
        submit: true,
        retData: action.retData,
        formBox: {
          visible: false,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'upload':
      return {
        submit: true,
        retData: action.retData,
        formBox: {
            visible: false,
            form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'fetchCompareData':
      return {
        submit: true,
        retData : action.retData,
        formBox: {
          visible: false,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'saveHistoryFormRef':
      return {
        submit: true,
        retData: state.retData,
        formBox: {
          visible: false,
          form: state.formBox.form,
        },
        historyFormBox: {
          visible: false,
          form: action.form
        }
      }
    case 'showHistoryModal':
      return {
        submit: true,
        retData: state.retData,
        formBox: {
          visible: false,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: true,
          form: state.historyFormBox.form
        }
      }
    case 'editHistoryForm':
      return {
        submit: true,
        retData: state.retData,
        formBox: {
          visible: false,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    case 'cancelHistoryForm':
      return {
        submit: true,
        retData: state.retData,
        formBox: {
          visible: false,
          form: state.formBox.form
        },
        historyFormBox: {
          visible: false,
          form: state.historyFormBox.form
        }
      }
    default:
      return state
  }
};

export default userReducer;
