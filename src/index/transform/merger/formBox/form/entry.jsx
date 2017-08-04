import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message, Icon} from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../store';
import { fillBasicToForm } from '../../../util/fillJsonToForm'
import { updateObj } from '../../../util/updateFieldValue';

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
  release(){
    let {
      submitData,
      dispatchUpdateLogStatus
    } = this.props;
    let {
      type,
      股票代码,
      公告日期,
      父进程公告日期
    } = submitData;

    let data = {
      type: type,
      code: 股票代码,
      date: 公告日期,
      parentdate: 父进程公告日期 || 公告日期
    };

    $.ajax({
      type: 'POST',
      url: 'api/release',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: retData => {
        if(!!retData && !retData.islogin){
          message.error('登录状态已失效，请重新登录！', 2, () => {
            dispatchUpdateLogStatus(false);
          });
          return;
        }
        if(!!retData && !retData.status){
          message.error('发布失败，未找到上一条相同记录！');
          return;
        }

        message.success('发布成功！');

      }
    })
  },

  handleCreate() {
    let {
      form,
      submitData,
      /* dispatchMergerFormSubmited,*/
      dispatchMergerFormCalcResult,
      dispatchUpdateLogStatus
    } = this.props;

    let me = this;

    form.validateFields((err, values) => {
      if (err) {
        message.error('数据不完善，请检查输入内容！');
        return;
      }
      submitData["type"] = "merge";

      /* 提交代码的时候记得重置submitData的值*/

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
          if(!retData.islogin){
            message.error('登录状态已失效，请重新登录！', 2, () => {
              dispatchUpdateLogStatus(false);
            });
            return;
          }
          /* dispatchMergerFormSubmited();*/

          if(!!retData.status && !!retData.data && !!retData.data.data){

            me.release();

            dispatchMergerFormCalcResult(retData.data.data);
            message.success('提交成功！');

            return;
          }
          message.error('提交失败！');
        }
      })
    });
  },

  componentDidMount(){
    let {
      form
    } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'mergerSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.mergerForm.submitData
        })
      }
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

    tmpMergerFormData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpMergerFormData
    });

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
     /* dispatchMergerFormSubmited: () => {
      *   return dispatch({type: 'mergerFormSubmited'})
      * },*/
     /* dispatchMergerFormChanged: values => {
      *   return dispatch({type: 'updateMergerFormData', values: values})
      * },*/

     dispatchMergerFormCalcResult: result => {
       return dispatch({type: 'mergerCalcResultReceived', result: result})
     },
     /* dispatchMergerSubmittedDataArrived: submitData => {
      *   return dispatch({type: 'mergerSubmittedDataArrived', submitData: submitData})
      * },*/
     dispatchUpdateLogStatus: status => {
       return dispatch({type: 'updateLogStatus', status: status})
     }

    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
