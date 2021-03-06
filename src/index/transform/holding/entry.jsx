import React from 'react';
import {connect} from 'react-redux';

import If from '../../common/if';
import TableBox from './tableBox/entry';
// import ButtonBox from './buttonBox/entry';
import UploadBox from '../common/uploadBox/entry';
import FormBox from './formBox/entry';
import ReleaseBox from './releaseBox/entry';

const UploadContainer = React.createClass({
  render() {
    const {isSubmit, retData, receivedData} = this.props;
    return(
      <div id="upload-holding-container">

        {/* <UploadBox /> */}
        <FormBox />

        {/* <If when={isSubmit}> */}
          <TableBox />
          {/* </If> */}
          <If when={false}>
            <ReleaseBox />
          </If>
      </div>
    )
  }
});

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    isSubmit: state.submit,
    retData: state.retData
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
