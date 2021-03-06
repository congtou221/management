import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="Create a new collection"
        okText="Create"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
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
        </Form>
      </Modal>
    );
  }
);

const CollectionForm = React.createClass({
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
  render(){
    <CollectionCreateForm
      ref={dispatchSaveFormRef}
      onCancel={dispatchCancel}
      onCreate={this.handleCreate}
    />
  }
})
function mapStateToProps(state) {
  return {
    formRef: state.formBox.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSaveFormRef: formRef => {
      return dispatch({type: 'saveFormRef', form: formRef})
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
)(CollectionCreateForm)
