import React from 'react';
import {connect} from 'react-redux';

import If from '../../common/if';
import TableBox from './tableBox/entry';
// import ButtonBox from './buttonBox/entry';
import UploadBox from '../common/uploadBox/entry';
import FormBox from './formBox/entry';

const submitAction = { type: 'submit' };

const UploadContainer = React.createClass({
  render() {
    const {isSubmit, retData, receivedData} = this.props;
    return(
      <div id="upload-merger-container">

        <UploadBox />
        <FormBox />

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
    isSubmit: state.mergerForm.submit,
    retData: state.mergerForm.calcResult
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadContainer)
