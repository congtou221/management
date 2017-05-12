import React from 'react';
import $ from 'jquery';
import { Table, Icon } from 'antd';
import { connect } from 'react-redux';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => {return <a href="#">{text}</a>},
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => {return (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  )},
}];

// const data = [{
//   key: '1',
//   name: 'John Brown',
//   age: 32,
//   address: 'New York No. 1 Lake Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   age: 42,
//   address: 'London No. 1 Lake Park',
// }, {
//   key: '3',
//   name: 'Joe Black',
//   age: 32,
//   address: 'Sidney No. 1 Lake Park',
// }];

const compareTableBox = React.createClass({
  componentWillMount(){
    let { dispatchFetchCompareData } = this.props;
    $.post({
      type: 'POST',
      url: 'api/posts',
      dataType: "json",
      data: {},
      success: retData => {
        dispatchFetchCompareData(retData);
      }
    });
  },
  formatData(){
    let { retData } = this.props;
    let columns = ['key', 'name', 'age', 'address'];

    return retData.map( (list) => {
      if(!Array.isArray(list)){
        return;
      }
      let i = 0;
      return columns.reduce((prev, cur) => {
        let temp = prev;
        temp[cur] = list[i];
        i++;
        return temp;
      }, {});
    });
  },
  render(){
    return <Table columns={columns} dataSource={this.formatData()} />
  }
});


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    retData: state.retData
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchCompareData: retData => {return dispatch({ type: 'fetchCompareData', retData: retData})}
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compareTableBox)



