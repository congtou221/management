import React from 'react';
import { Button, message } from 'antd';
import { connect } from 'react-redux';

const ReleaseBox = React.createClass({
  release(){
    let {
      submitData,
      dispatchUpdateLogStatus
    } = this.props;
    let {
      type,
      股票代码,
      公告日期,
      父进程公告日期
    } = submitData;

    let data = {
      type: type,
      code: 股票代码,
      date: 公告日期,
      parentdate: 父进程公告日期 || 公告日期
    };

    $.ajax({
      type: 'POST',
      url: 'api/release',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: retData => {
        if(!!retData && !retData.islogin){
          message.error('登录状态已失效，请重新登录！', 2, () => {
            dispatchUpdateLogStatus(false);
          });
          return;
        }
        if(!!retData && !retData.status){
          message.error('未找到上一条相同记录！');
          return;
        }

        message.success('发布成功！');

      }
    })
  },
  render(){
    return (
      <div class="release-wrapper" style={{width: "100%", textAlign: "center", marginTop: 20}}>
        <Button type="primary" size="large" onClick={this.release}>确认无误后，点击这里开始发布</Button>
      </div>
    )
  }
});

function mapStateToProps(state){
  return {
    submitData: state.increaseForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {
    dispatchUpdateLogStatus: status => {
      return dispatch({type: 'updateLogStatus', status: status})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseBox)
