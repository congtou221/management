import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message} from 'antd';
import { connect } from 'react-redux';

import BuyerinfoSection from './buyerinfoSec/entry';
import ProjectSection from './projectSec/entry';
import DealinfoSection from './dealinfoSec/entry';

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
      dispatchIncreaseFormCreated,
      dispatchIncreaseFormCalcResult
    } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      submitData["type"] = "increase";

      console.log(submitData); debugger;
      /* create successfully*/
      $.ajax({
        type: 'POST',
        url: 'api/increase',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData), //values need to be processed,
        success: retData => {
          dispatchIncreaseFormCalcResult(retData);
          console.log(retData);
          /* fetch new data after upload the form*/
          /* should be a get request*/
          form.resetFields();
          dispatchIncreaseFormCreated(retData);
          message.success('提交成功！')
        }
      })
    });
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

        <FormItem {...formItemLayout} label="本次定增事件是否热门">
          {getFieldDecorator('本次定增是否热门', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="定增前主营业务">
          {getFieldDecorator('定增前主营业务', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="定增后主营业务">
          {getFieldDecorator('定增后主营业务', {

          })(<Input />)}
        </FormItem>


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

    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    if(!!value && !!value.format){
      value = value.format('YYYY/MM/DD');
    }

    tmpIncreaseFormData[name] = value;

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

    dispatchIncreaseFormCreated: retData => {
      return dispatch({type: 'createIncreaseForm', retData: retData})
    },
    dispatchIncreaseFormCalcResult: result => {
      return dispatch({type: 'calcIncreaseResultReceived', result: result})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
