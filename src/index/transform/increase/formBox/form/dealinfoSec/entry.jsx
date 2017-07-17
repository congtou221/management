import React from 'react';
import { Form, InputNumber, Radio } from 'antd';

import { connect } from 'react-redux';

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
        <FormItem {...formItemLayout} label="交易金额">
          {getFieldDecorator('交易金额')(
             <InputNumber />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="增发股价">
          {getFieldDecorator('增发股价')(
             <InputNumber />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="增发数量">
          {getFieldDecorator('增发数量')(
             <InputNumber />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="定价方式">
          {getFieldDecorator('定价方式')(
             <RadioGroup>
               <Radio value="查询">查询</Radio>
               <Radio value="定价">定价</Radio>
             </RadioGroup>
           )}
        </FormItem>
      </div>
    )
  }
})

const WrappedDealInfo = Form.create({
  onFieldsChange(props, changedFields){
    let{name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpDealinfoData[name] = value;

    props.submitData["交易信息"] = tmpDealinfoData;
  }
})(DealInfo)

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
)(WrappedDealInfo)
