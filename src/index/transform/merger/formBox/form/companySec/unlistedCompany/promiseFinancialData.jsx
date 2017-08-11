import React from 'react';
import moment from 'moment';
import { Form, Button, Icon, Input, InputNumber, DatePicker, Row, Col } from 'antd';

import { connect } from 'react-redux';
import Store from '../../../../../../../store';

import { updateArray } from '../../../../../util/updateFieldValue';
import { fillArrToForm, fillArrLenToForm } from '../../../../../util/fillJsonToForm';
import toThousands from '../../../../../util/toThousands';
import by from '../../../../../util/sortby';

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
    /* 获取DOM节点上的key*/
    companyId = $(this.refs.promiseFinancialDataItem).parent().parent().data("key");

    /* 回填json*/
    let { form } = this.props;

    /* 也是执行不到subscrie回调*/

    let state = Store.getState();
    if(state.type === 'mergerSubmittedDataArrived'){
      let companys = state.mergerForm.submitData["被收购公司"];

      let company = companys.filter(item => {
        return item.key === companyId;
      })[0];

      let financialData = company["承诺业绩"];

      let keys = financialData.map(item => {
        return item.key;
      })

      fillArrLenToForm({
        form: form,
        keys: keys,
        keyname: 'financialDataKeys'
      })
      /*       更改financialDataKeys以后，需要等其render完毕，才能去对增加的表单项setValue，这里的解决办法不太好，需要再看看能不能找到回调函数*/
      setTimeout(() => {
        fillArrToForm({
          form: form,
          data: financialData
        })
      }, 2000);

    }

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
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <FormItem
                {...formItemLayout}
                label="承诺业绩的时间"
              >
                {getFieldDecorator(`时间-${key}`, {
                   rules: [{
                   }, {
                     validator: (rule, value, callback) => {
                       let r = /^\s*\d{4}\s*$/;
                       if(!r.test(value)){
                         callback('请输入四位年份数字！')
                       }
                     }
                   }]
                })(
                   <Input />
                 )}
              </FormItem>
            </Col>

            <Col className="gutter-row" span={6}>
              <FormItem
                {...formItemLayout}
                label="承诺业绩的净利润"
              >
                {getFieldDecorator(`净利润-${key}`, {

                })(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
          </Row>
        </div>
      )

    });

    return (
      <div className="financial-datalist" ref="promiseFinancialDataItem">
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="承诺财务数据">
              {getFieldDecorator('add-financial-data')(
                 <Button type="dashed" onClick={this.addFinancialData}>
                   <Icon type="plus" />增加
                 </Button>
               )}
            </FormItem>
          </Col>
        </Row>

        <div className="financial-dataitem-wrapper">
          {list}
        </div>


      </div>
    )
  }
})

const WrappedFinancialData = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpFinancialData = updateArray({
      props: props,
      changedFields: changedFields,
      addKey: 'financialDataKeys',
      tmpData: tmpFinancialData
    });

    tmpFinancialData.sort(by("时间"));

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
