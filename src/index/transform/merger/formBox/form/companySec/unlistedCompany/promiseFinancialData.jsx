import React from 'react';
import moment from 'moment';
import { Form, Button, Icon, InputNumber, DatePicker } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;

require('./financialData.scss');

let uuid = 0;

let tmpFinancialData = [];

let companyId;

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

  componentDidMount(){
    companyId = $(this.refs.promiseFinancialDataItem).parent().parent().data("key");
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14}
    }
    let dateFormat = "YYYY/MM/DD";

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
            label="承诺业绩的时间"
          >
            {getFieldDecorator(`承诺业绩的时间-${key}`, {
               rules: [{
                 type: 'object',
                 message: '请选择时间！'
               }],
               initialValue: moment(new Date(), dateFormat)
            })(
               <MonthPicker />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="承诺业绩的净利润"
          >
            {getFieldDecorator(`承诺业绩的净利润-${key}`, {

            })(
               <InputNumber />
             )}
          </FormItem>

        </div>
      )

    });

    return (
      <div className="financial-datalist" ref="promiseFinancialDataItem">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('add-financial-data')(
             <Button type="dashed" onClick={this.addFinancialData}>
               <Icon type="plus" />增加一条承诺财务数据
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

const WrappedFinancialData = Form.create({
  onFieldsChange(props, changedFields){

    let changeItem = Object.keys(changedFields)[0];

    if(changeItem == 'financialDataKeys'){
      let changedArr = changedFields[changeItem].value;

      let filtered = tmpFinancialData.filter(value => {
        if(!value.key){
          return false;
        }
        if(changedArr.indexOf(value.key) > -1){
          return true;
        }
        return false;
      })

      let newArr = changedArr.map(key => {
        if(filtered.indexOf(key) < 0){
          return {key: key}
        }
        return tmpFinancialData.find(item => {
          return item.key == key;
        })
      })

      tmpFinancialData = newArr;
    } else {
      let {name, value} = changedFields[changeItem];
      let index = name.slice(-1);
      let nameWithoutIndex = name.slice(0, -2);

      if(!!value && !!value.constructor && value.constructor === moment.prototype.constructor){
        value = value.format('YYYY')
      }

      let tmpArr = tmpFinancialData;

      tmpFinancialData = tmpArr.map(item => {
        if(item.key == +index){
          item[nameWithoutIndex] = value;
          return item;
        }
        return item;
      })

      if(typeof props.submitData["被收购公司"] == 'undefined'){
        props.submitData["被收购公司"] = [];
      }

      let tmpCompanyList = props.submitData["被收购公司"];

      let tmpCompanyCalcResult = tmpCompanyList.map(item => {
        if(item.key == companyId){
          item["承诺业绩"] = tmpFinancialData;
          return item;
        }
        return item;
      })
      props.submitData["被收购公司"] = tmpCompanyCalcResult;

    }
  }
})(FinancialData)

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
)(WrappedFinancialData)
