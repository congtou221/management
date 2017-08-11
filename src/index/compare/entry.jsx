import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Timeline, message } from 'antd';

import If from '../common/if';
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
    if(!id || id === '0'){
      return;
    }

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
        if(!!retData.status && !!retData.data && !!retData.data.data){ debugger;
          switch (retData.data.data.type){
            case 'merge':
              window.location.hash="#/upload/merger";
              setTimeout(() => {
                dispatchMergerSubmittedDataArrived(retData.data.data);
              }, 2000);

              break;
            case 'pp': debugger;
              window.location.hash="#/upload/increase";
              setTimeout(() => {
                dispatchIncreaseSubmittedDataArrived(retData.data.data);
              }, 2000);

              break;
            case 'jl':
              window.location.hash="#/upload/encourage";
              setTimeout(() => {
                dispatchEncourageSubmittedDataArrived(retData.data.data);
              }, 2000);

              break;
            case 'internal': debugger;
              window.location.hash="#/upload/holding";
              setTimeout(() => {
                dispatchHoldingSubmittedDataArrived(retData.data.data);
              }, 2000);

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
    let r = /失败/;

    let list = me.state.keys.map((key, index) => {

      return (
        <Timeline.Item key={index} color={r.test(key.action) ? 'red' : 'blue'}>
          <strong>
            {moment(key.timestamp).format('YYYY-MM-DD hh:mm:ss')}
          </strong>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <If when={key.id == 0}>
            <span>{key.action}</span>
          </If>
          <If when={key.id !== 0}>
            <a data-eventid = {key.id} href="javascript:void(0);" >
              {key.action}
            </a>
          </If>
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
