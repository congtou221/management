import React from 'react';
import { Form, Input,InputNumber, Radio } from 'antd';

import { connect } from 'react-redux';
import EventProperty from './eventProperty';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

require('./style.scss');

let tmpDealinfoData = {};

const DealInfo = React.createClass({

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="dealinfo-sec">
        <FormItem {...formItemLayout} label="交易总金额">
          {getFieldDecorator('交易总金额')(
             <InputNumber />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="交易方式">
          {getFieldDecorator('交易方式')(
             <RadioGroup>
               <Radio value="股份">股份</Radio>
               <Radio value="现金">现金</Radio>
               <Radio value="both">both</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="换股价">
          {getFieldDecorator('换股价')(
             <InputNumber />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="发行股份数量">
          {getFieldDecorator('发行股份数量')(
             <InputNumber />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="支付现金">
          {getFieldDecorator('支付现金')(
             <InputNumber />
           )}
        </FormItem>

        <EventProperty />
      </div>
    )
  }
})

const WrappedDealInfo = Form.create({
  onFieldsChange(props, changedFields){
    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpDealinfoData[name] = value;

    props.submitData["交易信息"] = tmpDealinfoData;

  }
})(DealInfo)

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
)(WrappedDealInfo)
