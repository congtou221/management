import $ from 'jquery';
import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message} from 'antd';
import { connect } from 'react-redux';

import RecruitSection from './recruitSec/entry';
import CompanySection from './companySec/entry';
import DealinfoSection from './dealinfoSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CollectionForm = React.createClass({

  handleCreate() {
    let { form, dispatchMergerFormCreated } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      /* create successfully*/
      $.ajax({
        type: 'POST',
        url: 'test/test2',
        dataType: 'json',
        data: {
         // input: JSON.stringify(values) //values need to be processed
        },
        success: retData => {
          console.log(retData);debugger;
          /* fetch new data after upload the form*/
          /* should be a get request*/
          form.resetFields();
          dispatchMergerFormCreated(retData);
          message.success('提交成功！')
        }
      })
    });
  },

  handleChange(value){
    console.log('selected', value)
  },

  render(){
    let { form, dispatchSaveMergerForm } = this.props;

    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }


    return (
      <Form className="merger-form"
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
              <Option key="草案">草案</Option>
              <Option key="修订稿">修订稿</Option>
              <Option key="部门批复">部门批复</Option>
              <Option key="证监会受理">证监会受理</Option>
              <Option key="通过">通过</Option>
              <Option key="证监会核准">证监会核准</Option>
              <Option key="失败">失败</Option>
              <Option key="上市">上市</Option>
              <Option key="中止">中止</Option>

            </Select>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="事件简述">
          {getFieldDecorator('description', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否借壳">
          {getFieldDecorator('isShell', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否有资产置出">
          {getFieldDecorator('isExchanged', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方是否热门">
          {getFieldDecorator('isPopularBuyer', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="被收购方是否热门">
          {getFieldDecorator('isPopularSeller', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="被收购方概念">
          {getFieldDecorator('seller-concept', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="被收购方行业">
          {getFieldDecorator('seller-industry', {

          })(<Input />)}
        </FormItem>


        <DealinfoSection />
        <RecruitSection />
        <CompanySection />

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
     dispatchMergerFormCreated: retData => {
       return dispatch({type: 'createMergerForm', retData: retData})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
