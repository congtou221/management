function userReducer(
  state = {
    isLogin: true,
    logForm: {
      visible: false,
      form: {}
    },
    submit: false,
    retData: [],
    mergerForm:{
      visible: true,
      form: {},
      showRecruitSec: true,
      submitData: {},
      calcResult: {},
      submit: false
    },
    increaseForm:{
      visible: true,
        form: {},
        submitData: {},
        calcResult: {},
        submit: false
    },
    encourageForm:{
      visible: true,
      form: {},
      submitData: {},
      calcResult: {}
    },
    holdingForm: {
      visible: true,
      form: {},
      submitData: {},
      calcResult: {}
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
  case 'encourageSubmittedDataArrived':
    return {
      type: 'encourageSubmittedDataArrived',
      isLogin: state.status,
      logForm: state.logForm,
      submit: state.submit,
      retData: state.retData,
      mergerForm: state.mergerForm,
      increaseForm: state.increaseForm,
      encourageForm: {
        visible: state.encourageForm.visible,
        form: state.encourageForm.form,
        submitData: action.submitted,
        calcResult: state.encourageForm.calcResult
      },
      holdingForm: state.holdingForm,
      historyFormBox: state.historyFormBox

    }
  case 'encourageCalcResultReceived':
    return {
      type: 'encourageCalcResultReceived',
      isLogin: state.status,
      logForm: state.logForm,
      submit: state.submit,
      retData: state.retData,
      mergerForm: state.mergerForm,
      increaseForm: state.increaseForm,
      encourageForm: {
        visible: state.encourageForm.visible,
        form: state.encourageForm.form,
        submitData: state.encourageForm.submitData,
        calcResult: action.result
      },
      holdingForm: state.holdingForm,
      historyFormBox: state.historyFormBox

    }
  case 'holdingSubmittedDataArrived':
    return {
      type: 'holdingSubmittedDataArrived',
      isLogin: state.status,
      logForm: state.logForm,
      submit: state.submit,
      retData: state.retData,
      mergerForm: state.mergerForm,
      increaseForm: state.increaseForm,
      encourageForm: state.encourageForm,
      holdingForm: {
        visible: state.holdingForm.visible,
        form: state.holdingForm.form,
        submitData: action.submitted,
        calcResult: state.holdingForm.calcResult
      },
      historyFormBox: state.historyFormBox
    }
  case 'holdingCalcResultReceived':debugger;
    return{
      type: 'holdingCalcResultReceived',
      isLogin: state.status,
      logForm: state.logForm,
      submit: state.submit,
      retData: state.retData,
      mergerForm: state.mergerForm,
      increaseForm: state.increaseForm,
      encourageForm: state.encourageForm,
      holdingForm: {
        visible: state.holdingForm.visible,
        form: state.holdingForm.form,
        submitData: state.holdingForm.submitData,
        calcResult: action.result
      },
      historyFormBox: state.historyFormBox

    }
  case 'increaseSubmittedDataArrived':
    return{
      type: 'increaseSubmittedDataArrived',
      isLogin: state.status,
      logForm: state.logForm,
      submit: state.submit,
      retData: state.retData,
      mergerForm: state.mergerForm,
      increaseForm: {
        visible: state.increaseForm.visible,
        form: state.increaseForm.form,
        submitData: action.submitted,
        calcResult: state.increaseForm.calcResult,
        submit: state.increaseForm.submit
      },
      encourageForm: state.encourageForm,
      holdingForm: state.holdingForm,
      historyFormBox: state.historyFormBox

    }
  case 'increaseCalcResultReceived':
    return {
      type: 'increaseCalcResultReceived',
      isLogin: state.status,
      logForm: {
        form : state.logForm.form,
        visible: state.logForm.visible
      },
      submit: state.submit,
      retData: state.retData,
      mergerForm: state.mergerForm,
      increaseForm: {
        visible: state.increaseForm.visible,
        form: state.increaseForm.form,
        submitData: state.increaseForm.submitData,
        calcResult: action.result,
        submit: true
      },
      encourageForm: state.encourageForm,
      holdingForm: state.holdingForm,
      historyFormBox: state.historyFormBox
    }

  case 'mergerCalcResultReceived':
    return {
      type: 'mergerCalcResultReceived',
      isLogin: state.status,
      logForm: {
        form : state.logForm.form,
        visible: state.logForm.visible
      },
      submit: state.submit,
      retData: state.retData,
      mergerForm: {
        visible: state.mergerForm.visible,
        form: state.mergerForm.form,
        showRecruitSec: state.mergerForm.showRecruitSec,
        submitData: state.mergerForm.submitData,
        calcResult: action.result,
        submit: true
      },
      increaseForm: state.increaseForm,
      encourageForm: state.encourageForm,
      holdingForm: state.holdingForm,
      historyFormBox: state.historyFormBox
    }
  case 'mergerSubmittedDataArrived':
    return {
        type: 'mergerSubmittedDataArrived',
        isLogin: state.status,
        logForm: {
          form : state.logForm.form,
          visible: state.logForm.visible
        },
        submit: state.submit,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec,
          submitData: action.submitted,
          calcResult: state.mergerForm.calcResult,
          submit: state.mergerForm.submit
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox

    }
    // case 'updateMergerFormData':
    //   return {
    //     isLogin: state.status,
    //     logForm: {
    //       form : state.logForm.form,
    //       visible: state.logForm.visible
    //     },
    //     submit: state.submit,
    //     retData: state.retData,
    //     mergerForm: {
    //       visible: state.mergerForm.visible,
    //       form: state.mergerForm.form,
    //       showRecruitSec: state.mergerForm.showRecruitSec,
    //       submitData: Object.assign(state.mergerForm.submitData, action.values)
    //     },
    //     increaseForm: state.increaseForm,
    //     encourageForm: state.encourageForm,
    //     holdingForm: state.holdingForm,
    //     historyFormBox: state.historyFormBox
    //   }
    case 'updateLogStatus':
      return {
        isLogin: action.status,
        logForm: {
          form : state.logForm.form,
          visible: state.logForm.visible
        },
        submit: state.submit,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec,
          submitData: state.mergerForm.submitData
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'saveLogForm':
      return {
        isLogin: state.isLogin,
        logForm: {
          form : action.form,
          visible: state.logForm.visible
        },
        submit: state.submit,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec,
          submitData: state.mergerForm.submitData
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'showLogForm':
      return {
        isLogin: state.isLogin,
        logForm: {
          visible: true,
          form: state.logForm.form
        },
        submit: state.submit,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec,
          submitData: state.mergerForm.submitData
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'hideLogForm':
    return  {
        isLogin: state.isLogin,
        logForm: {
          visible: false,
          form: state.logForm.form
        },
        submit: state.submit,
        retData: state.retData,
        mergerForm: {
          visible: state.mergerForm.visible,
          form: state.mergerForm.form,
          showRecruitSec: state.mergerForm.showRecruitSec,
          submitData: state.mergerForm.submitData
        },
        increaseForm: state.increaseForm,
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
    case 'upload':
       return {
        isLogin: state.isLogin,
        logForm: state.logForm,
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
    // case 'saveMergerForm':
    //   return {
    //     isLogin: state.isLogin,
    //     logForm: state.logForm,
    //     submit: true,
    //     retData: state.retData,
    //     mergerForm: {
    //       visible: state.mergerForm.visible,
    //       form: action.form,
    //       showRecruitSec: state.mergerForm.showRecruitSec
    //     },
    //     increaseForm: state.increaseForm,
    //     encourageForm: state.encourageForm,
    //     holdingForm: state.holdingForm,
    //     historyFormBox: state.historyFormBox
    //   }
    case 'mergerFormSubmited':
      return state;
    case 'showMergerForm':
      return {
        isLogin: state.isLogin,
        logForm: state.logForm,
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
        isLogin: state.isLogin,
        logForm: state.logForm,
        submit: state.submit,
        retData: state.retData,
        isLogin: state.isLogin,
        logForm:{
          visible: false,
          form: {}
        },
        mergerForm: {
          submitData: state.mergerForm.submitData,
          calcResult: state.mergerForm.calcResult,
          submit: state.mergerForm.submit,
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
        isLogin: state.isLogin,
        logForm: state.logForm,
        submit: true,
        retData: state.retData,
        mergerForm: state.mergerForm,
        increaseForm: {
            visible: !state.increaseForm.visible,
            form: state.increaseForm.form,
            submitData: action.retData
        },
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
  case 'calcIncreaseResultReceived':
      return {
        isLogin: state.isLogin,
        logForm: state.logForm,
        submit: true,
        retData: action.retData,
        mergerForm: state.mergerForm,
        increaseForm: {
            visible: true,
            form: state.increaseForm.form,
            submitData: state.increaseForm.submitData,
            calcResult: action.result
        },
        encourageForm: state.encourageForm,
        holdingForm: state.holdingForm,
        historyFormBox: state.historyFormBox
      }
  // case 'createIncreaseForm' :
  //     return {
  //       isLogin: state.isLogin,
  //       logForm: state.logForm,
  //       submit: true,
  //       retData: action.retData,
  //       mergerForm: state.mergerForm,
  //       increaseForm: {
  //           visible: true,
  //           form: state.increaseForm.form,
  //           submitData: state.increaseForm.submitData,
  //           calcResult: state.increaseForm.calcResult
  //       },
  //       encourageForm: state.encourageForm,
  //       holdingForm: state.holdingForm,
  //       historyFormBox: state.historyFormBox

  //     }
    case 'showEncourageForm' :
      return {
        isLogin: state.isLogin,
        logForm: state.logForm,
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
        isLogin: state.isLogin,
        logForm: state.logForm,
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
        isLogin: state.isLogin,
        logForm: state.logForm,
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
        isLogin: state.isLogin,
        logForm: state.logForm,
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
    default:
      return state
  }
};

export default userReducer;
