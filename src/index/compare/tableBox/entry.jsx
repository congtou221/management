import React from 'react';
import $ from 'jquery';
import { Table, Icon, Form, Modal, Radio, Input } from 'antd';
import { connect } from 'react-redux';
/* import CollectionCreateForm from '../../transform/formBox/common/form';*/

require('./tableBox.scss');

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

const compareTableBox = React.createClass({
  componentWillMount(){
    let { dispatchFetchCompareData } = this.props;
    $.post({
      type: 'POST',
      url: 'api/posts',
      dataType: "json",
      data: {},
      success: retData => {
        dispatchFetchCompareData(retData);
      }
    });
  },
  formatData(){
    let { retData } = this.props;
    let columns = ['key', 'name', 'age', 'address'];

    return retData.map( (list) => {
      if(!Array.isArray(list)){
        return;
      }
      let i = 0;
      return columns.reduce((prev, cur) => {
        let temp = prev;
        temp[cur] = list[i];
        i++;
        return temp;
      }, {});
    });
  },
  handleCreate(){
    let {formRef, dispatchEdited} = this.props;
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
          dispatchEdited(retData);
        }
      })
    });
  },
  render(){
    let {visible, dispatchCancel, dispatchShowHistoryModal, dispatchSaveHistoryFormRef} = this.props;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => {return (
        <a onClick={dispatchShowHistoryModal} href="javascript:void(0)">Edit</a>
      )},
    }];

    return (
      <div>
        <Table columns={columns} dataSource={this.formatData()} pagination={false} />
      <CollectionCreateForm
          ref={dispatchSaveHistoryFormRef}
          visible={visible}
          onCancel={dispatchCancel}
          onCreate={this.handleCreate}
        />
     </div>
    )
  }
});


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    visible: state.historyFormBox.visible,
    formRef: state.historyFormBox.form,
    retData: state.retData
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchCompareData: retData => {
      return dispatch({
        type: 'fetchCompareData', retData: retData
      })
    },
    dispatchSaveHistoryFormRef: formRef => {
      return dispatch({
        type: 'saveHistoryFormRef',
        form: formRef
      })
    },
    dispatchShowHistoryModal: () => {
      return dispatch({
        type: 'showHistoryModal'
      })
    },
    dispatchEdited: () => {
      return dispatch({
        type: 'editHistoryForm'
      })
    },
    dispatchCancel: () => {
      return dispatch({
        type: 'cancelHistoryForm'
      })
    }
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compareTableBox)
