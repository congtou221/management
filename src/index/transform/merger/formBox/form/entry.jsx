import $ from 'jquery';
import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button} from 'antd';
import { connect } from 'react-redux';

import RecruitSection from './recruitSec/entry';

const FormItem = Form.Item;

const handleCreate= () => {
  let { form, dispatchCreated } = this.props;
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
        dispatchCreated(retData);
      }
    })
  });
}

const CollectionForm = React.createClass({
  /* componentWillMount(){
   *   let {form, dispatchSaveMergerForm } = this.props;
   *   dispatchSaveMergerForm(form);
   * },*/
  render(){
    let { form, dispatchSaveMergerForm } = this.props;

    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 14 }
    }

    return (
      <Form layout="horizontal"
            onSubmit={handleCreate}>
        <FormItem {...formItemLayout} label="股票代码">
          {getFieldDecorator('id', {
             rules: [{
               required: true,
               message: '请输入股票代码！'
             }],
          })(<Input />)}
        </FormItem>

        <RecruitSection />
        <FormItem>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
    )
  }

})

const WrappedCollectionForm = Form.create()(CollectionForm);

 function mapStateToProps(state) {

   return {
    // form : state.mergerForm.form
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
     /* dispatchCreated: retData => {
      *   return dispatch({type: 'create', retData: retData})
      * }*/
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
