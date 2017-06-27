import $ from 'jquery';
import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message} from 'antd';
import { connect } from 'react-redux';

import StatusSection from './statusSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CollectionForm = React.createClass({

  handleCreate() {
    let { form, dispatchHoldingFormCreated } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      /* create successfully*/
      $.post({
        type: 'POST',
        url: 'api/posts',
        dataType: 'json',
        data: {
          input: JSON.stringify(values) //values need to be processed
        },
        success: retData => {
          /* fetch new data after upload the form*/
          /* should be a get request*/
          form.resetFields();
          dispatchHoldingFormCreated(retData);
          message.success('提交成功！')
        }
      })
    });
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
          {getFieldDecorator('id', {
             rules: [{
               required: true,
               message: '请输入股票代码！'
             }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="公告日期">
          {getFieldDecorator('date', {
             rules: [{
               required: true,
               message: '请选择公告日期！'
             }],
          })(<DatePicker />)}
        </FormItem>


        <FormItem {...formItemLayout} label="进程">
          {getFieldDecorator('process', {
             rules: [{
               required: true,
               message: '请选择进程！'
             }],
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
          {getFieldDecorator('description', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="计划公告日">
          {getFieldDecorator('plandate', {
             rules: [{
               required: true,
               message: '请选择计划公告日期！'
             }],
          })(<DatePicker />)}
        </FormItem>

        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('type', {

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
          {getFieldDecorator('concept', {

          })(<Input />)}
        </FormItem>


        <FormItem {...formItemLayout} label="增减持起始时间">
          {getFieldDecorator('begain-date', {
             rules: [{
               required: true,
               message: '请选择增减持起始时间！'
             }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="增减持结束时间">
          {getFieldDecorator('finish-date', {
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

const WrappedCollectionForm = Form.create()(CollectionForm);

 function mapStateToProps(state) {

   return {

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
     dispatchHoldingFormCreated: retData => {
       return dispatch({type: 'createHoldingForm', retData: retData})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
