import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import If from '../../../common/if';
import CollectionCreateForm from './form/entry';

require('./style.scss');

const CollectionsPage = React.createClass({
  fillForm(){
    let {
      dispatchMergerSubmittedDataArrived
    } = this.props;

    $.ajax({
      type: 'GET',
      url: 'api/merge/input',
      contentType: 'application/json; charset=UTF-8',
      data: {
        type: 'merge'
      },
      success: retData => {
        if(!!retData.status && !!retData.data && !!retData.data.data){
          dispatchMergerSubmittedDataArrived(retData.data.data);
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
      <div className="merger-form-wrapper">
        <Button onClick={dispatchShowModal}>录入并购数据</Button>
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
    visible: state.mergerForm.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowModal: () => {
      return dispatch({type: 'showMergerForm'})
    },
    dispatchMergerSubmittedDataArrived:  submittedData => {
      return dispatch({type: 'mergerSubmittedDataArrived', submitted: submittedData})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
