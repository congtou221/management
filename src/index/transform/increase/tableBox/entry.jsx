import React from 'react'
import { Table, Icon } from 'antd';

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
    <a href="#">Action 一 {record.name}</a>
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

const tableBox = React.createClass({
  formatData(){
    let { dataSource } = this.props;
    let columns = ['key', 'name', 'age', 'address'];

    return dataSource.map( (list) => {
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

  render() {
    let dataSource = this.formatData();

    return <Table style={{ margin: '24px 0' }} columns={columns} dataSource={dataSource} />;
  }
});
export default tableBox;
