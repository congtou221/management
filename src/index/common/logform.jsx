import React from 'react';
import { Button, Modal, Form, Input, Radio, Icon, Checkbox } from 'antd';
import {connect} from 'react-redux';
import If from './if';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="登录"
        okText="Log in"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem>
            {getFieldDecorator('userName', {
               rules: [{ required: true, message: '请输入用户名！' }],
            })(
               <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
             )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
               rules: [{ required: true, message: '请输入密码！' }],
            })(
               <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
             )}
          </FormItem>
          {/* <FormItem>
              {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
              })(
              <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
              </Button>
              Or <a href="">register now!</a>
              </FormItem> */}
        </Form>
      </Modal>
    );
  }
);

const LogForm = React.createClass({

  handleCreate() {
    let {
      form,
      visible,
      dispatchHideLogForm,
      dispatchUpdateLogStatus
    } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);

      $.ajax({
        type: 'POST',
        url: 'api/loginfo',
        dataType: 'json',
        data: values,
        success: retData => {

          if(retData.status){
            dispatchUpdateLogStatus(true);
//            window.location.reload();
          }

          form.resetFields();

          dispatchHideLogForm();

        }
      })
    });
  },

  render() {
    let {
      isLogin,
      visible,
      dispatchShowLogForm,
      dispatchHideLogForm,
      dispatchSaveLogForm
    } = this.props;
    return (
      <div>
        <If when={!isLogin}>
          <Button type="primary" onClick={dispatchShowLogForm}>登录</Button>
        </If>
        <If when={!!isLogin}>
          <Button type="primary" shape="circle" icon="user" />
        </If>

        <CollectionCreateForm
          ref={dispatchSaveLogForm}
          visible={visible}
          onCancel={dispatchHideLogForm}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin,
    visible: state.logForm.visible,
    form: state.logForm.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowLogForm: () => {
      return dispatch({type: 'showLogForm'})
    },
    dispatchHideLogForm: () => {
      return dispatch({type: 'hideLogForm'})
    },
    dispatchSaveLogForm: form => {
      return dispatch({type: 'saveLogForm', form: form})
    },
    dispatchUpdateLogStatus: status => {
      return dispatch({type: 'updateLogStatus', status: status})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogForm);
