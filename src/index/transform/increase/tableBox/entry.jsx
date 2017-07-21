import React from 'react';
import {connect} from 'react-redux';

import ResultBox from '../../common/resultBox/entry';

const resultBox = React.createClass({
  render(){
    return(
      <ResultBox input={this.props.input} output={this.props.output}/>
    )
  }
});

function mapStateToProps(state){
  return {
    input: state.increaseForm.submitData,
    output: state.increaseForm.calcResult
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resultBox)
