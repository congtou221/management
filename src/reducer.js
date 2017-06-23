function userReducer(
  state = {
    submit: false,
    retData: [],
    mergerForm:{
      visible: true,
      form: {},
      showRecruitSec: true,
      recruitBuyerNumber: 0,
      recruitBuyerList:[],

    },
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
    case 'saveMergerForm':
      return {
        submit: true,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: action.form,
          showRecruitSec: true,
          recruitBuyerNumber: state.mergerForm.recruitBuyerNumber,
          recruitBuyerList: state.mergerForm.recruitBuyerList
        }
      }
    case 'showMergerModal':
      return {
        submit: true,
        retData: state.retData,
        mergerForm:{
            visible: true,
            form: state.mergerForm.form,
            showRecruitSec: true,
            recruitBuyerNumber: state.mergerForm.recruitBuyerNumber,
            recruitBuyerList: state.mergerForm.recruitBuyerList
        }
      }
    case 'showRecruitSec' :
      return {
        submit: true,
        retData: state.retData,
        mergerForm: {
          visible: true,
          form: state.mergerForm.form,
          showRecruitSec: action.showRecruitSec,
          recruitBuyerNumber: state.mergerForm.recruitBuyerNumber,
          recruitBuyerList: state.mergerForm.recruitBuyerList
        }
      }
  case 'addKnowBuyer':
      return {
          submit: true,
          retData: state.retData,
          mergerForm: {
              visible: true,
              form: state.mergerForm.form,
              showRecruitSec: true,
              recruitBuyerNumber: action.number,
              recruitBuyerList: action.list
          }
      }
  case 'addUnknowBuyer':
      return {
          submit: true,
          retData: state.retData,
          mergerForm: {
              visible: true,
              form: state.mergerForm.form,
              showRecruitSec: true,
              recruitBuyerNumber: action.number,
              recruitBuyerList: action.list
          }
      }
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
