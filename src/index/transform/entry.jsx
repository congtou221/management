import $ from 'jquery';
import React from 'react';
import { Input, Button } from 'antd';
import {connect} from 'react-redux';

import If from '../common/if';
import InputBox from './inputBox/entry';
import TableBox from './tableBox/entry';
// import ButtonBox from './buttonBox/entry';

const submitAction = { type: 'submit' };

const tableBox = React.createClass({
  handleSubmit(){
    let {inputText, dispatchSubmit} = this.props;
    let inputArr = inputText.split(String.fromCharCode(10)).map(rows => {
      return rows.split(String.fromCharCode(9))
    });
    $.post({
      type: 'POST',
      url: 'api/posts',
      dataType: "json",
      data: {
        input: inputArr
      },
      success: retData => {
        dispatchSubmit(retData);
      }
    });

  },
  render() {
    const {isSubmit, retData, receivedData} = this.props;
    return(
      <div id="container">
        <InputBox />
        <Button onClick={this.handleSubmit}> click me </Button>
        <If when={isSubmit}>
          <TableBox dataSource={retData}/>
        </If>
      </div>
    )
  }
});

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    isSubmit: state.submit,
    inputText: state.inputText,
    retData: state.retData,
    receivedData: state.receivedData
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    dispatchSubmit: retData => {return dispatch({ type: 'submit', retData: retData, receivedData: true})}
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(tableBox)
