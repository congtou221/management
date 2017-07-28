import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

const ReleaseBox = React.createClass({
  release(){

  },
  render(){
    return (
      <div class="release-wrapper" style={{width: "100%", textAlign: "center", marginTop: 20}}>
        <Button type="primary" size="large" onClick={this.release}>确认无误后，点击这里开始发布</Button>
      </div>
    )
  }
});

function mapStateToProps(state){
  return {
    submitData: state.holdingForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseBox)
