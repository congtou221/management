import $ from 'jquery';
import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import {connect} from 'react-redux';


const uploadBox = React.createClass( {
  updateTable() {
    let { dispatchUploaded } = this.props;
    $.get({
      type: 'GET',
      url: 'api/posts',
      dataType: 'json',
      success: retData => {
        dispatchUploaded(retData);
      }
    })
  },
  render() {
    let { updateTable } = this;
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          updateTable();
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
          updateTable();
        }
      },
    };

    return (
      <Upload {...props} style={{ display: 'inline-block' }}>
        <Button>
          <Icon type="upload" /> 上传文件（.xls/.xlsx）
        </Button>
      </Upload>
    )
  }
});

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploaded: retData => {
      return dispatch({type: 'upload', retData: retData})}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(uploadBox)
