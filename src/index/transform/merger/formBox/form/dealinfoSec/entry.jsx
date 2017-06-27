import React from 'react';
import { Form, Input, Radio } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

require('./style.scss');

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
          {getFieldDecorator('deal-allmoney')(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="交易方式">
          {getFieldDecorator('deal-way')(
             <RadioGroup>
               <Radio value="股份">股份</Radio>
               <Radio value="现金">现金</Radio>
               <Radio value="both">both</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="换股价">
          {getFieldDecorator('deal-price')(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="换股数量">
          {getFieldDecorator('deal-amount')(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="现金金额">
          {getFieldDecorator('deal-cash')(
             <Input />
           )}
        </FormItem>
      </div>
    )
  }
})

const WrappedDealInfo = Form.create()(DealInfo)

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedDealInfo)
