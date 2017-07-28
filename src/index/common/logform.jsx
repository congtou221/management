import React from 'react';
import { Button, Modal, Form, Input, Radio, Icon, Checkbox, Menu, Dropdown, message } from 'antd';
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
            {getFieldDecorator('username', {
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

      $.ajax({
        type: 'POST',
        url: 'api/login',
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
  logout(){
    let { dispatchUpdateLogStatus } = this.props;


    $.ajax({
      type: 'GET',
      url: 'api/logout',
      dataType: 'json',
      success: retData => {
        if(!!retData && !!retData.status){
          dispatchUpdateLogStatus(false);
        //  window.location.reload();
        }
      },
      error: err => {
        message.error("登出失败，请再次尝试！");
      }
    })
  },
  componentWillMount(){
    let { dispatchUpdateLogStatus } = this.props;
    $.ajax({
      type: 'GET',
      url: 'api/checklogin',
      dataType: 'json',
      success: retData => {
        if(retData.islogin){
          dispatchUpdateLogStatus(true);
          return;
        }
        dispatchUpdateLogStatus(false);
      }
    })
  },
  render() {
    let {
      isLogin,
      visible,
      dispatchShowLogForm,
      dispatchHideLogForm,
      dispatchSaveLogForm
    } = this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.logout}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <If when={!isLogin}>
          <Button type="primary" onClick={dispatchShowLogForm}>登录</Button>
        </If>
        <If when={!!isLogin}>
          <Dropdown overlay={menu}>
            <Button type="primary" shape="circle" icon="user" />
          </Dropdown>
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
