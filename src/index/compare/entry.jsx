import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Timeline, message } from 'antd';

//import CollapseBox from './nestedTableBox/entry';

const HistoryContainer = React.createClass({
  getInitialState(){
    return {
      keys: []
    }
  },
  componentWillMount(){
    let me = this;

    $.ajax({
      type: 'GET',
      url: 'api/records',
      dataType: 'json',
      success: retData => {
        if(!!retData && !!retData.status && !!retData.data){
          if(Array.isArray(retData.data.data)){
            me.setState({
              keys: retData.data.data
            })
          }
        }
      },
      error: err => {
        message.error("您尚未登录！")
      }
    })
  },
  locateInput(e){
    let id = $(e.target).data("eventid");
    let {
      dispatchMergerSubmittedDataArrived,
      dispatchIncreaseSubmittedDataArrived,
      dispatchEncourageSubmittedDataArrived,
      dispatchHoldingSubmittedDataArrived
    } = this.props;

    $.ajax({
      type: 'GET',
      url: 'api/input',
      dataType: 'json',
      data: {id:id},
      success: retData => {
        if(!!retData.status && !!retData.data && !!retData.data.data){
          switch (retData.data.data.type){
            case 'merge':
              window.location.href="/#/upload/merger";
              setTimeout(() => {
                dispatchMergerSubmittedDataArrived(retData.data.data);
              }, 2000);

              break;
            case 'pp':
              window.location.href="/#/upload/increase";
              setTimeout(() => {
                dispatchIncreaseSubmittedDataArrived(retData.data.data);
              }, 2000);

              break;
            case 'jl':
              window.location.href="/#/upload/encourage";
              setTimeout(() => {
                dispatchEncourageSubmittedDataArrived(retData.data.data);
              }, 2000);

              break;
            case 'internal':
              window.location.href="/#/upload/holding";
              setTimeout(() => {
                dispatchHoldingSubmittedDataArrived(retData.data.data);
              });

              break;
          }

        }
      },
      error: err => {
        message.error('网络错误，请稍后重试！');
      }
    })
  },
  render(){
    let me = this;
    let list = me.state.keys.map((key, index) => {

      return (
        <Timeline.Item key={index}>
          <strong>
            {moment(key.timestamp).format('YYYY-MM-DD hh:mm:ss')}
          </strong>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a data-eventid = {key.id} >
            {key.action}
          </a>
        </Timeline.Item>
      )
    })
    return (

      <Timeline onClick={this.locateInput}>
        {list}
      </Timeline>

    )
  }
})

 function mapStateToProps(state) {
   return {

   }
 }

 function mapDispatchToProps(dispatch) {
   return {

     dispatchMergerSubmittedDataArrived:  submittedData => {
       return dispatch({type: 'mergerSubmittedDataArrived', submitted: submittedData})
     },

     dispatchIncreaseSubmittedDataArrived: submittedData => {
       return dispatch({type: 'increaseSubmittedDataArrived', submitted: submittedData})
     },

     dispatchEncourageSubmittedDataArrived: submittedData => {
       return dispatch({type: 'encourageSubmittedDataArrived', submitted: submittedData })
     },

     dispatchHoldingSubmittedDataArrived: submittedData => {
       return dispatch({type: 'holdingSubmittedDataArrived', submitted: submittedData})
     }


   }
 }

 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(HistoryContainer)
/* export default HistoryContainer;*/
