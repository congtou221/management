import React from 'react';
import { Form, Input } from 'antd';

import { connect } from 'react-redux';

require('./buyerBriefIntro.scss');

const FormItem = Form.Item;

let tmpBriefIntroData = [];

const BriefIntro = React.createClass({

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="briefintro-wrapper">
        收购方股东简称
        <FormItem {...formItemLayout} label="收购方1">
          {getFieldDecorator('收购方股东简称-1', {
          })(
            <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方2">
          {getFieldDecorator('收购方股东简称-2', {
          })(
             <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方3">
          {getFieldDecorator('收购方股东简称-3', {
          })(
             <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方4">
          {getFieldDecorator('收购方股东简称-4', {
          })(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购方5">
          {getFieldDecorator('收购方股东简称-5', {
          })(
             <Input />
           )}
        </FormItem>

      </div>
    )
  }
})

const WrappedBriefIntro = Form.create({
  onFieldsChange(props, changedFields){
    /* 注意：在提交数据后，需要把tmpBriefIntroData置空
     *   tmpBriefIntroData = [];
     */
    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpBriefIntroData.push(value);

    props.submitData["收购方股东简称"] = tmpBriefIntroData;

  }
})(BriefIntro)

function mapStateToProps(state) {
  return {
    submitData: state.mergerForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedBriefIntro)
