import $ from 'jquery';
import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import If from '../../../common/if';
import CollectionCreateForm from './form/entry';

require('./style.scss');

const CollectionsPage = React.createClass({
  fillForm() {
    let {
      dispatchHoldingSubmittedDataArrived
    } = this.props;

    $.ajax({
      type: 'GET',
      url: 'api/holding/input',
      contentType: 'application/json; charset=UTF-8',
      data: {
        type: 'increase'
      },
      success: retData => {
        /* 将获取到的历史json存入store*/
        if(!!retData.status && !!retData.data && !!retData.data.data){
          dispatchHoldingSubmittedDataArrived(retData.data.data);
        }
      }
    })
  },
  render() {
    let {
      visible,
      dispatchShowModal
    } = this.props;
    return (
      <div className="holding-form-wrapper">
        <Button onClick={dispatchShowModal}>录入增减持数据</Button>
        <Button onClick={this.fillForm} style={{marginLeft: 10}}>将JSON数据填入表单</Button>
        <If when={visible}>
            <CollectionCreateForm />
        </If>
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    visible: state.holdingForm.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowModal: () => {
      return dispatch({type: 'showHoldingForm'})
    },
    dispatchHoldingSubmittedDataArrived: submitData => {
      return dispatch({type: 'holdingSubmittedDataArrived', submitted: submitData})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
