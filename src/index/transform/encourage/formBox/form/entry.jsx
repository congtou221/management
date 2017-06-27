import $ from 'jquery';
import React from 'react';
import { Form, Input, Radio, DatePicker, Button, message, Select} from 'antd';
import { connect } from 'react-redux';

//import RecruitSection from './recruitSec/entry';
//import CompanySection from './companySec/entry';
import UnlockSection from './unlockSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const CollectionForm = React.createClass({
  handleChange() {

  },
  handleCreate() {
    let { form, dispatchEncourageFormCreated } = this.props;
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
          dispatchEncourageFormCreated(retData);
          message.success('提交成功！')
        }
      })
    });
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
              <Option key='计划'>计划</Option>
              <Option key='进展'>进展</Option>
              <Option key='结束'>结束</Option>

             </Select>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="事件简述">
          {getFieldDecorator('description', {

          })(<Input />)}
        </FormItem>


        <FormItem {...formItemLayout} label="股票概念">
          {getFieldDecorator('shares-concept', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="授予价">
          {getFieldDecorator('price', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="股份数量">
          {getFieldDecorator('amount', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('type', {
          })(
             <RadioGroup>
               <Radio value="限制性股票激励">限制性股票激励</Radio>
               <Radio value="股票期权激励">股票期权激励</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="基准年">
          {getFieldDecorator('basedate', {
             rules: [{
               required: true,
               message: '请选择基准年！'
             }],
          })(<DatePicker />)}
        </FormItem>

        <UnlockSection />

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
     dispatchEncourageFormCreated: retData => {
       return dispatch({type: 'createEncourageForm', retData: retData})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
