import $ from 'jquery';
import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import If from '../../../common/if';
import CollectionCreateForm from './form/entry';

const CollectionsPage = React.createClass({
  render() {
    let {
      visible,
      dispatchShowModal
    } = this.props;
    return (
      <div className="holding-form-wrapper">
        <Button onClick={dispatchShowModal}>录入增减持数据</Button>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
