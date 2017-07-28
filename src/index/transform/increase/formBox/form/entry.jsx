import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message} from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../store';

import MainBusiness from './mainBusiness';
import BuyerBriefIntro from './buyerBriefIntro';
import BuyerinfoSection from './buyerinfoSec/entry';
import ProjectSection from './projectSec/entry';
import DealinfoSection from './dealinfoSec/entry';

import { updateObj } from '../../../util/updateFieldValue';
import { fillBasicToForm } from '../../../util/fillJsonToForm';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let tmpIncreaseFormData = {};

const CollectionForm = React.createClass({

  handleCreate() {
    let {
      form,
      submitData,
      dispatchIncreaseFormCalcResult,
      dispatchUpdateLogStatus
    } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        message.error('数据不完善，请检查输入内容！');
        return;
      }

      submitData["type"] = "pp";

      console.log(submitData);

      $.ajax({
        type: 'POST',
        url: 'api/increase',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData), //values need to be processed,
        success: retData => {
          if(!retData.islogin){
            message.error('登录状态已失效，请重新登录！', 2, ()=>{
              dispatchUpdateLogStatus(false);
            });
            return;
          }

          if(!!retData.status && !!retData.data && !!retData.data.data){
            dispatchIncreaseFormCalcResult(retData.data.data);
            message.success('提交成功！');
            return;
          }

          message.error('提交失败');
        },
        error: err => {
          message.error('网络错误，请稍后重试！');
        }
      })
    });
  },
  componentWillMount(){
    let {
      form
    } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'increaseSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.increaseForm.submitData
        })
      }
    })

  },
  render(){
    let { form, dispatchSaveMergerForm } = this.props;

    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }

    return (
      <Form className="increase-form"
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
              <Option key='草案'>草案</Option>
              <Option key='修订稿'>修订稿</Option>
              <Option key='部门批复'>部门批复</Option>
              <Option key='证监会受理'>证监会受理</Option>
              <Option key='通过'>通过</Option>
              <Option key='证监会核准'>证监会核准</Option>
              <Option key='失败'>失败</Option>
              <Option key='上市'>上市</Option>
              <Option key='中止'>中止</Option>

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

        <FormItem {...formItemLayout} label="本次定增事件是否热门">
          {getFieldDecorator('项目是否热门', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>


        <FormItem {...formItemLayout} label="股权变化备注">
          {getFieldDecorator('股权变化备注', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="募投项目概念">
          {getFieldDecorator('募投项目概念', {

          })(<Input />)}
        </FormItem>

        <MainBusiness />
        <BuyerBriefIntro />

        <DealinfoSection />
        <BuyerinfoSection />
        <ProjectSection />

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

    tmpIncreaseFormData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpIncreaseFormData
    });

    Object.assign(props.submitData, tmpIncreaseFormData);

  }
})(CollectionForm);

function mapStateToProps(state) {

  return {
    submitData: state.increaseForm.submitData
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

    /* dispatchIncreaseFormCreated: retData => {
     *   return dispatch({type: 'createIncreaseForm', retData: retData})
     * },*/
    dispatchIncreaseFormCalcResult: result => {
      return dispatch({type: 'increaseCalcResultReceived', result: result})
    },
    dispatchUpdateLogStatus: status => {
      return dispatch({type: 'updateLogStatus', status: status})
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
