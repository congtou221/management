import React from 'react';
import { Form, Button, Icon, Input, DatePicker } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;

require('./financialData.scss');

let uuid = 0;

const FinancialData = React.createClass({

  addFinancialData(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const financialDataKeys = getFieldValue('financialDataKeys');

    uuid++;
    financialDataKeys.push(uuid);

    setFieldsValue({
      financialDataKeys: financialDataKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const financialDataKeys = getFieldValue('financialDataKeys');

    setFieldsValue({
      financialDataKeys: financialDataKeys.filter(key => key !==k )
    })
  },

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14}
    }


    getFieldDecorator('financialDataKeys', { initialValue: [] });
    const financialDataKeys = getFieldValue('financialDataKeys');

    let list = financialDataKeys.map((key, index) => {
      return (
        <div className="financial-dataitem" key={key}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={ () => this.remove(key) }
          />

          <FormItem
            {...formItemLayout}
            label="已实现业绩的时间范围"
          >
            {getFieldDecorator('financial-time', {
               rules: [{
                 type: 'array',
                 message: '请选择时间！'
               }]
            })(
               <RangePicker />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="已实现业绩的净利润"
          >
            {getFieldDecorator('financial-profile', {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="承诺业绩的时间"
          >
            {getFieldDecorator('financial-promise-time', {
               rules: [{
                 type: 'object',
                 message: '请选择时间！'
               }]
            })(
               <MonthPicker />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="承诺业绩的净利润"
          >
            {getFieldDecorator('financial-primise-profile', {

            })(
               <Input />
             )}
          </FormItem>

        </div>
      )

    });

    return (
      <div className="financial-datalist">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('add-financial-data')(
             <Button type="dashed" onClick={this.addFinancialData}>
               <Icon type="plus" />增加一条财务数据
             </Button>
           )}
        </FormItem>

        <div className="financial-dataitem-wrapper">
          {list}
        </div>


      </div>
    )
  }
})

const WrappedFinancialData = Form.create()(FinancialData)

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedFinancialData)
