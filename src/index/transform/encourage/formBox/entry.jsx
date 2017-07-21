import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import If from '../../../common/if';
import { connect } from 'react-redux';
import CollectionCreateForm from './form/entry';
require('./style.scss')

const CollectionsPage = React.createClass({
  fillForm(){
    let {
      dispatchEncourageSubmittedDataArrived
    } = this.props;

    $.ajax({
      type: 'GET',
      url: 'api/encourage/input',
      contentType: 'application/json; charset=UTF-8',
      data: {
        type: 'increase'
      },
      success: retData => {
        if(!!retData.status && !!retData.data && !!retData.data.data){
          dispatchEncourageSubmittedDataArrived(retData.data.data);
        }
      }
    })
  },
  render() {
    let { visible, dispatchShowModal } = this.props;
    return (
      <div className="encourage-form-wrapper">
        <Button onClick={dispatchShowModal}>录入激励数据</Button>
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
    visible: state.encourageForm.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowModal: () => {
      return dispatch({type: 'showEncourageForm'})
    },
    dispatchEncourageSubmittedDataArrived: submitData => {
      return dispatch({type: 'encourageSubmittedDataArrived', submitted: submitData })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
