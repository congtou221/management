import $ from 'jquery';
import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message} from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../store';

import { updateObj } from '../../../util/updateFieldValue';
import { fillBasicToForm } from '../../../util/fillJsonToForm';

import StatusSection from './statusSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let tmpHoldingData = {};

const CollectionForm = React.createClass({

  handleCreate() {
    let {
      form,
      submitData,
      dispatchHoldingFormCalcResult
    } = this.props;
    /* form.validateFields((err, values) => {
     *   if (err) {
     *     return;
     *   }
     */

    submitData["type"] = "holding";

      console.log(submitData); debugger;
      /* create successfully*/
      $.ajax({
        type: 'POST',
        url: 'api/holding',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData),

        success: retData => {
          console.log(retData); debugger;
          dispatchHoldingFormCalcResult(retData);
          message.success('提交成功！')
        }
      })
    /* });*/
  },
  componentDidMount(){
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'holdingSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.holdingForm.submitData
        })
      }
    })
  },
  render(){
    let { form } = this.props;

    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }

    return (
      <Form className="holding-form"
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
              <Option key='预案'>预案</Option>
              <Option key='草案'>草案</Option>
              <Option key='修订'>修订</Option>
              <Option key='审批'>审批</Option>
              <Option key='核准'>核准</Option>
              <Option key='终止'>终止</Option>
              <Option key='交割'>交割</Option>

             </Select>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="事件简述">
          {getFieldDecorator('事件简述', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="计划公告日">
          {getFieldDecorator('计划公告日', {
          })(<DatePicker />)}
        </FormItem>

        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('类型', {

          })(
             <Select>
               <Option value="大股东增持">大股东增持</Option>
               <Option value="大股东减持">大股东减持</Option>
               <Option value="高管坚持">高管增持</Option>
               <Option value="高管减持">高管减持</Option>
               <Option value="员工持股计划">员工持股计划</Option>
               <Option value="回购">回购</Option>
             </Select>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="股票概念">
          {getFieldDecorator('股票概念', {

          })(<Input />)}
        </FormItem>


        <FormItem {...formItemLayout} label="增减持起始时间">
          {getFieldDecorator('增减持起始时间', {
             rules: [{
               required: true,
               message: '请选择增减持起始时间！'
             }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="增减持结束时间">
          {getFieldDecorator('增减持结束时间', {
             rules: [{
               required: true,
               message: '请选择增减持结束时间！'
             }],
          })(<DatePicker />)}
        </FormItem>

        <StatusSection />

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

    tmpHoldingData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpHoldingData
    })

    Object.assign(props.submitData, tmpHoldingData);
  }
})(CollectionForm);

 function mapStateToProps(state) {

   return {
     submitData : state.holdingForm.submitData
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
     /* dispatchHoldingFormCreated: retData => {
      *   return dispatch({type: 'createHoldingForm', retData: retData})
      * }*/
     dispatchHoldingFormCalcResult: result => {
       return dispatch({type: 'holdingCalcResultReceived', result: result})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
