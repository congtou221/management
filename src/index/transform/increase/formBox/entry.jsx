import $ from 'jquery';
import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';

import If from '../../../common/if';
import CollectionCreateForm from  './form/entry';

require('./style.scss');

const CollectionsPage = React.createClass({

  fillForm() {
    let {
      dispatchIncreaseSubmittedDataArrived
    } = this.props;

    $.ajax({
      type: 'GET',
      url: 'api/increase/input',
      contentType: 'application/json; charset=UTF-8',
      data: {
        type: 'increase'
      },
      success: retData => {
        /* 将获取到的历史json存入store*/
        if(!!retData.status && !!retData.data && !!retData.data.data){
          dispatchIncreaseSubmittedDataArrived(retData.data.data);
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
      <div className="increase-form-wrapper">
        {/* <Button onClick={dispatchShowModal}>录入定增数据</Button> */}
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
    visible: state.increaseForm.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowModal: () => {
      return dispatch({type: 'showIncreaseForm'})
    },
    dispatchIncreaseSubmittedDataArrived: submittedData => {
      return dispatch({type: 'increaseSubmittedDataArrived', submitted: submittedData})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
