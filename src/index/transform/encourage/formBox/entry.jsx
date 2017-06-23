import $ from 'jquery';
import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import If from '../../../common/if';
import { connect } from 'react-redux';
import CollectionCreateForm from './common/form';
require('./style.scss')

const CollectionsPage = React.createClass({
  render() {
    let { visible, dispatchShowModal } = this.props;
    return (
      <div style={{display: 'inline-block'}}>
        <Button onClick={dispatchShowModal}>Fill the Form Manually</Button>
        <If when={visible}>
          <CollectionCreateForm />
        </If>
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    visible: state.formBox.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowModal: () => {
      return dispatch({type: 'showModal'})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
