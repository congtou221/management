import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Timeline } from 'antd';

//import CollapseBox from './nestedTableBox/entry';

const HistoryContainer = React.createClass({
  locateInput(){

  },
  render(){
    let keys = ["test1", "test2"];

    let list = keys.map((key, index) => {

      return (
        <Timeline.Item>{key}</Timeline.Item>
      )
    })
    return (

      <Timeline>
        {list}
      </Timeline>

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
