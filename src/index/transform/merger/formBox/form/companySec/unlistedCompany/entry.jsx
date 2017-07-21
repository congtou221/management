import React from 'react';
import { Form, Input, InputNumber } from 'antd';

import FinancialData from './financialData';
import PromiseFinancialData from './promiseFinancialData';
import Shareholder from './shareholder';


import { connect } from 'react-redux';
import Store from '../../../../../../../store';

import { updateObj } from '../../../../../util/updateFieldValue';
import { fillBasicToForm } from '../../../../../util/fillJsonToForm';

const FormItem = Form.Item;

let companyId;

const UnlistedCompany = React.createClass({

  componentDidMount(){
    /* 获取DOM节点上的key*/
    companyId = $(this.refs.unlistCompanyItem.parentNode).data("key");

    /* 回填json*/
    let { form } = this.props;

    /* 不明白为什么subscribe回调不执行
     * Store.subscribe(() => {});*/

    let state = Store.getState();
    if(state.type === 'mergerSubmittedDataArrived'){
      let companys = state.mergerForm.submitData["被收购公司"];

      let company = companys.filter(item => {
        return item.key === companyId;
      })[0];

      fillBasicToForm({
        form: form,
        data: company
      });
    }

  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }


    return (
      <div className="unlisted-company" ref="unlistCompanyItem">

        <label>非上市公司</label>

        <FormItem {...formItemLayout} label="公司名称">
          { getFieldDecorator('名称', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="公司行业">
          { getFieldDecorator('行业', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="公司概念">
          { getFieldDecorator('概念', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购价格">
          { getFieldDecorator('收购价格', {

          })(
              <InputNumber />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购现金">
          { getFieldDecorator('支付现金', {

          })(
              <InputNumber />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购比例">
          { getFieldDecorator('收购比例', {

          })(
              <InputNumber />
            )}
        </FormItem>

        <FinancialData />
        <PromiseFinancialData />
        <Shareholder />

      </div>
    )
  }
})

const WrappedUnlistedCompany = Form.create({
  onFieldsChange(props, changedFields){

    if(typeof props.submitData["被收购公司"] == "undefined"){
      props.submitData["被收购公司"] = [];
    }

    let tmpCompanyData = props.submitData["被收购公司"].map(item => {
      if(item.key == companyId){
        return updateObj({
          props: props,
          changedFields: changedFields,
          tmpData: item
        });
      }
      return item;
    });

    props.submitData["被收购公司"] = tmpCompanyData;

  }
})(UnlistedCompany)

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
)(WrappedUnlistedCompany)
