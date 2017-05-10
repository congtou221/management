import $ from 'jquery';
import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

const inputBox = React.createClass({
  // getInitialState(){
  //   return{
  //     InputText: ''
  //   }
  // },
  // handleInput(e){
  //   this.setState({InputText: e.target.value});
  // },

  render() {
    let {inputText, handleInput} = this.props;
    return <Input
        type="textarea"
        placeholder="请输入..."
        value={inputText}
        onInput={handleInput}
        autosize={{ minRows: 2, maxRows: 6}}/>;
  }
});

function mapStateToProps(state) {
  return {
    inputText: state.inputText
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInput: e => {return dispatch({type: 'input', inputText: e.target.value})}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(inputBox)
