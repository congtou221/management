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
        <FormItem {...formItemLayout} label="交易金额">
          {getFieldDecorator('deal-allmoney')(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="增发股价">
          {getFieldDecorator('deal-price')(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="增发数量">
          {getFieldDecorator('deal-amount')(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="定价方式">
          {getFieldDecorator('deal-type')(
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
