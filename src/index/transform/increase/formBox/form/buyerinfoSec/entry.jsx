import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';

import BuyerList from './buyerList';

require('./style.scss');

const RecruitSection = React.createClass({
  render(){
    return (
      <div className="buyerinfo-sec">
        <BuyerList />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const WrappedRecruitSection = Form.create()(RecruitSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRecruitSection)
