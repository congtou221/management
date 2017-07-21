import React from 'react';
import { Form, Input, InputNumber, Radio, DatePicker, Button, message, Select} from 'antd';
import { connect } from 'react-redux';

import Store from '../../../../../store';
import { fillBasicToForm } from '../../../util/fillJsonToForm';

import { updateObj } from '../../../util/updateFieldValue';

//import RecruitSection from './recruitSec/entry';
//import CompanySection from './companySec/entry';
import UnlockSection from './unlockSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

let tmpEncourageFormData = {};

const CollectionForm = React.createClass({
  handleChange() {

  },
  handleCreate() {
    let {
      form,
      submitData,
      dispatchEncourageFormCalcResult
    } = this.props;

    /* form.validateFields((err, values) => {
     *   if (err) {
     *     return;
     *   }
     */
    submitData["type"] = "jl";

    console.log(submitData);

    $.ajax({
      type: 'POST',
      url: 'api/encourage',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(submitData),
      success: retData => {
          dispatchEncourageFormCalcResult(retData);
          message.success('提交成功！');

        if(!!retData.status && !!retData.data && !!retData.data.data){
          dispatchEncourageFormCalcResult(retData.data.data);
          message.success('提交成功！');
        }
      }
    })
    /* });*/
  },

  componentDidMount(){
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'encourageSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.encourageForm.submitData
        })
      }
    })
  },
  render(){
    let { form, dispatchSaveEncourageForm } = this.props;

    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }

    return (
      <Form className="encourage-form"
            layout="horizontal"
            onSubmit={this.handleCreate}>
        <FormItem {...formItemLayout} label="股票代码">
          {getFieldDecorator('股票代码', {
             rules: [{
               required: true,
               message: '请输入股票代码！'
             }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="公告日期">
          {getFieldDecorator('公告日期', {
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="进程">
          {getFieldDecorator('进程', {
          })(
             <Select
               mode="combobox"
               notFoundContent=""
               defaultActiveFirstOption={false}
               showArrow={true}
               filterOption={false}
               onChange={this.handleChange}
               >
              <Option key='计划'>计划</Option>
              <Option key='进展'>进展</Option>
              <Option key='结束'>结束</Option>

             </Select>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="事件简述">
          {getFieldDecorator('事件简述', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="父进程日期">
          {getFieldDecorator('父进程日期', {
          })(<DatePicker />)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否只有标题">
          {getFieldDecorator('是否只有标题', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="链接">
          {getFieldDecorator('链接', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="概念">
          {getFieldDecorator('概念', {

          })(<Input />)}
        </FormItem>

        <div className="price-wrapper">
          <FormItem {...formItemLayout} label="激励股价">
            {getFieldDecorator('激励股价', {

            })(<InputNumber />)}
          </FormItem>

          <FormItem {...formItemLayout} label="激励股份数量">
            {getFieldDecorator('激励股份数量', {

            })(<InputNumber />)}
          </FormItem>
        </div>

        <FormItem {...formItemLayout} label="激励类型">
          {getFieldDecorator('激励类型', {
          })(
             <RadioGroup>
               <Radio value="限制性股票激励">限制性股票激励</Radio>
               <Radio value="股票期权激励">股票期权激励</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="基准年">
          {getFieldDecorator('基准年', {
           })(<InputNumber />)}
        </FormItem>

        <UnlockSection />

        <FormItem style={{textAlign: 'center'}}>
          <Button className="submit-btn" type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    )
  }

})

const WrappedCollectionForm = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpEncourageFormData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpEncourageFormData
    });

    Object.assign(props.submitData, tmpEncourageFormData);
  }
})(CollectionForm);

 function mapStateToProps(state) {

   return {
     submitData: state.encourageForm.submitData
   }
 }

function mapDispatchToProps(dispatch) {
   return {
     /* dispatchSaveMergerForm: form => {
      *   return dispatch({
      *     type: 'saveMergerForm',
      *     form: form
      *   })
      * }*/
     dispatchEncourageFormCreated: retData => {
       return dispatch({type: 'createEncourageForm', retData: retData})
     },
     dispatchEncourageFormCalcResult: result => {
       return dispatch({
         type: 'encourageCalcResultReceived',
         result: result
       })
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
