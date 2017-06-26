import $ from 'jquery';
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
      <div id="upload-encourage-container">
        激励
        Please choose to <UploadBox /> or <FormBox />
        {/* <InputBox /> */}
        {/* <Button onClick={this.showForm}> click me to fill a form </Button> */}
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
