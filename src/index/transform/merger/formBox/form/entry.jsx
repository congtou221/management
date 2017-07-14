import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message, Icon} from 'antd';
import { connect } from 'react-redux';

import BuyerBriefIntro from './buyerBriefIntro';
import RecruitSection from './recruitSec/entry';
import CompanySection from './companySec/entry';
import DealinfoSection from './dealinfoSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let tmpMergerFormData = {};

const CollectionForm = React.createClass({

  handleCreate() {
    let {
      form,
      submitData,
      dispatchMergerFormSubmited,
      dispatchMergerFormCalcResult
    } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      submitData["type"] = "merge";

      console.log(submitData); debugger;
      let newData = Object.assign(values, submitData);
      /* 将本组件内的数据，用来进行post请求；
       * 与此同时，更新store里的mergerForm.submitData*/
      /* dispatchMergerFormSubmitBtnClicked();*/

      /* create successfully*/
      $.ajax({
        type: 'POST',
        url: 'api/test2',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData),
        success: retData => {
          dispatchMergerFormCalcResult(retData);
          console.log(retData);debugger;
          /* fetch new data after upload the form*/
          /* should be a get request*/
          form.resetFields();
          dispatchMergerFormSubmited(retData);
          message.success('提交成功！')

        }
      })
    });
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

        <FormItem {...formItemLayout} label="事件描述">
          {getFieldDecorator('事件描述', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="父进程日期">
          {getFieldDecorator('父进程日期', {
          })(<DatePicker />)}
        </FormItem>

        <FormItem {...formItemLayout} label="是否只录标题">
          {getFieldDecorator('是否只录标题', {

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

        <FormItem {...formItemLayout} label="收购方概念是否热门">
          {getFieldDecorator('收购方概念是否热门', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="被收购方概念是否热门">
          {getFieldDecorator('被收购方概念是否热门', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="被收购方概念">
          {getFieldDecorator('被收购方概念', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="被收购方行业">
          {getFieldDecorator('被收购方行业', {

          })(<Input />)}
        </FormItem>

        <BuyerBriefIntro />

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

const WrappedCollectionForm = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    if(!!value && !!value.constructor && value.constructor === moment.prototype.constructor){
      value = value.format('YYYY/MM/DD')
    }

    tmpMergerFormData[name] = value;

    Object.assign(props.submitData, tmpMergerFormData);

  }
})(CollectionForm);

 function mapStateToProps(state) {

   return {
     submitData: state.mergerForm.submitData
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
     dispatchMergerFormSubmited: retData => {
       return dispatch({type: 'createMergerForm', retData: retData})
     },
     dispatchMergerFormChanged: values => {
       return dispatch({type: 'updateMergerFormData', values: values})
     },
     dispatchMergerFormCalcResult: result => {
       return dispatch({type: 'calcResultReceived', result: result})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
