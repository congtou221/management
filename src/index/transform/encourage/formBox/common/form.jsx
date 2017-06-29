import $ from 'jquery';
import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, Select, Button} from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;

const CollectionForm = React.createClass({
  handleCreate(){
    let { form, dispatchCreated } = this.props;
    form.validateFields((err, values) => {debugger
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
  },
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal"
            onSubmit={this.handleCreate}>
        <FormItem label="股票代码">
          {getFieldDecorator('id', {
             rules: [{ required: true, message: '请输入股票代码！' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="公告日期">
          {getFieldDecorator('date', {
             rules: [{ type:'object', required: true, message: '请选择公告日期！' }],
        })(<DatePicker />)}
        </FormItem>
        <FormItem label="股票概念">
          {getFieldDecorator('concept', {
             rules: [{ required: true, message: '请输入股票概念！' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="授予价格">
          {getFieldDecorator('price', {
            rules: [{ required: true, message: '请输入授予价格！'}]
          })(<Input />)}
        </FormItem>

      <FormItem label="公告类型">
          {getFieldDecorator('type', {
             initialValue: 'restriction'
          })(
             <Select>
               <Option value="restriction">限制性股票激励</Option>
               <Option value="option">股票期权激励</Option>
             </Select>
           )}
        </FormItem>


        <FormItem label="Description">
          {getFieldDecorator('description')(<Input type="textarea" />)}
        </FormItem>
        <FormItem className="collection-create-form_last-form-item">
          {getFieldDecorator('modifier', {
             initialValue: 'public',
          })(
             <Radio.Group>
               <Radio value="public">Public</Radio>
               <Radio value="private">Private</Radio>
             </Radio.Group>
           )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
    );
  }
});

const WrappedCollectionForm = Form.create()(CollectionForm);

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreated: retData => {
      return dispatch({type: 'create', retData: retData})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
