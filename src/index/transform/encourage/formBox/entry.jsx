import $ from 'jquery';
import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
/* import CollectionCreateForm from './common/form';*/
require('./style.scss')

const FormItem = Form.Item;
const Option = Select.Option;
const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
      title="激励"
      okText="Create"
      visible={visible}
      onCancel={onCancel}
      onOk={onCreate}
      >
      <Form layout="horizontal">
        <FormItem label="股票代码">
          {getFieldDecorator('id', {
             rules: [{ required: true, message: '请输入股票代码！' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="股票概念">
          {getFieldDecorator('concept', {
             rules: [{ required: true, message: '请输入股票概念！' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="公告日期">
          {getFieldDecorator('date', {
             rules: [{ required: true, message: '请选择公告日期！' }],
          })(<DatePicker />)}
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
        <FormItem label="资金总额">
          {getFieldDecorator('all-money', {
          })(<Input />)}
        </FormItem>
        <FormItem label="股价">
          {getFieldDecorator('price', {
          })(<Input />)}
        </FormItem>
        <FormItem label="股份数量">
          {getFieldDecorator('amount', {
          })(<Input />)}
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
      </Form>
          </Modal>
    );
  }
);

const CollectionsPage = React.createClass({
  handleCreate(){
    let {formRef, dispatchCreated} = this.props;
    formRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      /* create successfully*/
      $.post({
        type: 'POST',
        url: 'api/posts',
        dataType: 'json',
        data: {
          input: values
        },
        success: retData => {
          /* fetch new data after upload the form*/
          /* should be a get request*/
          formRef.resetFields();
          dispatchCreated(retData);
        }
      })
    });
  },
  render() {
    let {
      visible,
      dispatchSaveFormRef,
      dispatchShowModal,
      dispatchCancel
    } = this.props;
    return (
      <div style={{display: 'inline-block'}}>
        <Button onClick={dispatchShowModal}>Fill the Form Manually</Button>
        <CollectionCreateForm
          ref={dispatchSaveFormRef}
          visible={visible}
          onCancel={dispatchCancel}
          onCreate={this.handleCreate}
          style={{width: '960'}}
        />
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    visible: state.formBox.visible,
    formRef: state.formBox.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSaveFormRef: formRef => {
      return dispatch({type: 'saveFormRef', form: formRef})
    },
    dispatchShowModal: () => {
      return dispatch({type: 'showModal'})
    },
    dispatchCancel: () => {
      return dispatch({type: 'cancel'})
    },
    dispatchCreated: retData => {
      return dispatch({type: 'create', retData: retData})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsPage)
