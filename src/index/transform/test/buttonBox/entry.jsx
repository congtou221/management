import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

const buttonBox = React.createClass( {
  componentWillReceiveProps(){
    let { receivedData, finishLoading } = this.props;

    if(receivedData) {
      finishLoading();
    }
},
  render() {
    let { loading, enterLoading } = this.props;
    return (
        <Button type="primary" loading={loading}>
          Click me!
        </Button>
    );
  }
});


function mapStateToProps(state) {
  return {
    loading: state.buttonBox.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    enterLoading: () => {return dispatch({type: 'enterLoading'})},
    finishLoading: () => {return dispatch({type: 'finishLoading'})}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(buttonBox)

