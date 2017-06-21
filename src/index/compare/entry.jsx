import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';

import CollapseBox from './nestedTableBox/entry';

const HistoryContainer = React.createClass({
  render(){
    return (
      <div id="history-container">
        <CollapseBox />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryContainer)
