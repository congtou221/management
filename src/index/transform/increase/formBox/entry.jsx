import $ from 'jquery';
import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';

import If from '../../../common/if';
import CollectionCreateForm from  './form/entry';

const CollectionsPage = React.createClass({

  render() {
    let {
      visible,
      dispatchShowModal
    } = this.props;
    return (
      <div className="increase-form-wrapper">
        <Button onClick={dispatchShowModal}>录入表单</Button>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
