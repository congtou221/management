import React from 'react';
import { Form, Input, Row, Col } from 'antd';

import { connect } from 'react-redux';

import Store from '../../../../../store';

import { fillBasicToForm } from '../../../util/fillJsonToForm';
import { updateObj } from '../../../util/updateFieldValue';

const FormItem = Form.Item;

let tmpBusinessData = {};

const MainBusiness = React.createClass({
  componentDidMount(){
    let {
      form
    } = this.props;


    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'increaseSubmittedDataArrived' ){

        /* 回填定增前后主营业务*/
        fillBasicToForm({
          form: form,
          data: state.increaseForm.submitData["主营业务"]
        })

      }
    })
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="mainbusiness-wrapper">

        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <FormItem {...formItemLayout} label="定增前主营业务">
              {getFieldDecorator('定增前', {

              })(<Input />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={12}>
            <FormItem {...formItemLayout} label="定增后主营业务">
              {getFieldDecorator('定增后', {

              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

      </div>
    )
  }
})

const WrappedBriefIntro = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpBusinessData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpBusinessData
    })

    props.submitData["主营业务"] = tmpBusinessData;

  }
})(MainBusiness)

function mapStateToProps(state) {
  return {
    submitData: state.increaseForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedBriefIntro)
