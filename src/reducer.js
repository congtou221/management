function userReducer(
  state = {
    submit: false,
    retData: [],
    mergerForm:{
      visible: true,
      form: {},
      showRecruitSec: false
    },
    increaseForm:{
      visible: true,
      form: {}
    },
    encourageForm:{
      visible: true,
      form: {}
    },
    holdingForm: {
      visible: true,
      form: {}
    },
    // formBox:{
    //     visible: false,
    //     form: {}
    // },
    historyFormBox:{
        visible: false,
        form: {}
    }
  }, action) {
  switch (action.type) {
    case 'upload':
       return {
        submit: true,
        retData: action.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'saveMergerForm':
      return {
        submit: true,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: action.form,
          showRecruitSec: state.mergerForm.showRecruitSec
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'createMergerForm':
      return {
        submit: true,
        retData: action.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'showMergerForm':
      return {
        submit: true,
        retData: state.retData,
        mergerForm:{
            visible: !state.mergerForm.visible,
            form: state.mergerForm.form,
            showRecruitSec: state.mergerForm.showRecruitSec
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'showRecruitSec' :
      return {
        submit: true,
        retData: state.retData,
        mergerForm: {
          visible: true,
          form: state.mergerForm.form,
          showRecruitSec: action.showRecruitSec
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'showIncreaseForm' :
      return {
        submit: true,
        retData: state.retData,
        mergerForm: state.mergerForm,
        increaseForm: {
          visible: !state.increaseForm.visible
        },
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'createIncreaseForm' :
      return {
        submit: true,
        retData: action.retData,
        mergerForm: state.mergerForm,
        increaseForm: {
          visible: true
        },
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox

      }
    case 'showEncourageForm' :
      return {
        submit: true,
        retData: state.retData,
        mergerForm: state.mergerForm,
        increaseForm: state.increaseForm,
        encourageForm: {
          visible: !state.encourageForm.visible,
          form: state.encourageForm.form
        },
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'createEncourageForm':
      return {
        submit: true,
        retData: action.retData,
        mergerForm: state.mergerForm,
        increaseForm: state.increaseForm,
        encourageForm: {
          visible: true,
          form: action.encourageForm.form
        },
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'showHoldingForm':
      return {
        submit: true,
        retData: state.retData,
        mergerForm: state.mergerForm,
        increaseForm: state.increaseForm,
        encourageForm:state.encourageForm,
        holdingForm: {
          visible: !state.holdingForm.visible,
          form: state.holdingForm.form
        },
        historyFormBox: state.historyFormBox
      }
    case 'createHoldingForm':
      return {
        submit: true,
        retData: action.retData,
        mergerForm: state.mergerForm,
        increaseForm: state.increaseForm,
        encourageForm:state.encourageForm,
        holdingForm: {
          visible: true,
          form: state.holdingForm.form
        },
        historyFormBox: state.historyFormBox
      }

    // case 'saveFormRef':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     mergerForm: {
    //       visible: true,
    //       form: state.mergerForm.form,
    //       showRecruitSec: action.showRecruitSec
    //     }
    //   }
    // case 'showModal':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     mergerForm: {
    //       visible: true,
    //       form: state.mergerForm.form,
    //       showRecruitSec: action.showRecruitSec
    //     },

    //     formBox:{
    //       visible: true,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: state.historyFormBox.form
    //     }
    //   }
    // case 'cancel':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: state.historyFormBox.form
    //     }
    //   }
    // case 'create':
    //   return {
    //     submit: true,
    //     submit: true,
    //     retData: action.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: state.historyFormBox.form
    //     }
    //   }

    // case 'fetchCompareData':
    //   return {
    //     submit: true,
    //     retData : action.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: state.historyFormBox.form
    //     }
    //   }
    // case 'saveHistoryFormRef':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form,
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: action.form
    //     }
    //   }
    // case 'showHistoryModal':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: true,
    //       form: state.historyFormBox.form
    //     }
    //   }
    // case 'editHistoryForm':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: state.historyFormBox.form
    //     }
    //   }
    // case 'cancelHistoryForm':
    //   return {
    //     submit: true,
    //     retData: state.retData,
    //     formBox: {
    //       visible: false,
    //       form: state.formBox.form
    //     },
    //     historyFormBox: {
    //       visible: false,
    //       form: state.historyFormBox.form
    //     }
    //   }
    default:
      return state
  }
};

export default userReducer;
