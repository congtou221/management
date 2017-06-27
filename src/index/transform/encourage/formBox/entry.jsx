import $ from 'jquery';
import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import If from '../../../common/if';
import { connect } from 'react-redux';
import CollectionCreateForm from './form/entry';
require('./style.scss')

const CollectionsPage = React.createClass({
  render() {
    let { visible, dispatchShowModal } = this.props;
    return (
      <div className="encourage-form-wrapper">
        <Button onClick={dispatchShowModal}>录入激励数据</Button>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
