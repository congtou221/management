import $ from 'jquery';
import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message} from 'antd';
import { connect } from 'react-redux';

import BuyerinfoSection from './buyerinfoSec/entry';
import ProjectSection from './projectSec/entry';
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
          dispatchMergerFormCreated(retData);
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

        <FormItem {...formItemLayout} label="本次定增事件是否热门">
          {getFieldDecorator('isHot', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="定增前主营业务">
          {getFieldDecorator('majorBeforeIncrase', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="定增后主营业务">
          {getFieldDecorator('majorAfterIncrase', {

          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="本次定增的进程">
          {getFieldDecorator('process', {
             rules: [{
               required: true,
               message: '请选择进程！'
             }],
          })(
             <Select>
               <Option value="预案">预案</Option>
               <Option value="草案">草案</Option>
               <Option value="修订">修订</Option>
               <Option value="审批">审批</Option>
               <Option value="核准">核准</Option>
               <Option value="终止">终止</Option>
               <Option value="交割">交割</Option>
             </Select>
           )}
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
