import $ from 'jquery';
import React from 'react';
import { Input } from 'antd';
import {connect} from 'react-redux';

import If from '../common/if';
import InputBox from './inputBox/entry';
import TableBox from './tableBox/entry';

const submitAction = { type: 'submit' };

const tableBox = React.createClass({
  handleSubmit(){
    let {inputText, dispatchSubmit} = this.props;
    let inputArr = inputText.split(String.fromCharCode(10)).map(rows => {
      return rows.split(String.fromCharCode(9))
    });
    $.ajax({
      type: 'POST',
      url: 'api/login',
      data: {
        input: ''
      },
      success: retData => {
        dispatchSubmit();
        console.log(retData);
      }
    })


  },
  render() {
    const {isSubmit} = this.props;
    return(
      <div id="container">
        <InputBox />
        <If when={isSubmit}>
          <TableBox />
        </If>
        <div onClick={this.handleSubmit}>clickHere</div>
      </div>
    )
  }
});

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    isSubmit: state.submit,
    inputText: state.inputText
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    dispatchSubmit: () => {return dispatch(submitAction)}
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(tableBox)
