import React from 'react'
import { Icon, Tree } from 'antd';
import { connect } from 'react-redux';

const TreeNode = Tree.TreeNode;
/*
 * const columns = [{
 *   title: '事件',
 *   dataIndex: 'event',
 *   key: 'event'
 * }, {
 *   title: '股票代码',
 *   dataIndex: 'id',
 *   key: 'id',
 * }, {
 *   title: '公告日期',
 *   dataIndex: 'date',
 *   key: 'date',
 * }, {
 *   title: '进程',
 *   dataIndex: 'process',
 *   key: 'process',
 * }, {
 *   title: 'Action',
 *   key: 'action',
 *   render: (text, record) => {return (
 *     <a href="#">编辑 一 {record.event}</a>
 *   )},
 * }];
 *
 * const data = [{
 *   key: '1',
 *   name: 'John Brown',
 *   age: 32,
 *   address: 'New York No. 1 Lake Park',
 * }, {
 *   key: '2',
 *   name: 'Jim Green',
 *   age: 42,
 *   address: 'London No. 1 Lake Park',
 * }, {
 *   key: '3',
 *   name: 'Joe Black',
 *   age: 32,
 *   address: 'Sidney No. 1 Lake Park',
 * }];
 * */
const tableBox = React.createClass({
  formatData(){
    let { calcResult } = this.props;
    let columns = ['key', 'event', 'id', 'date', 'process'];
    let tmp = JSON.parse(calcResult.body);

    return tmp.data.data;
  },

  render() {

    let dataSource = this.formatData();

    let loop = (data) => {

      return Object.keys(data).map((key) => {
        let item = data[key];
        if(Object.prototype.toString.call(item) === "[object Array]"){
          return <TreeNode key={key} title={key}>{loop(item)}</TreeNode>
        }
        if(Object.prototype.toString.call(item) === "[object Object]"){
          return <TreeNode key={key} title={key}>{loop(item)}</TreeNode>
        }
        return <TreeNode key={`${key}: ${item}`} title={`${key}: ${item}`}/>
      })
    }

    /* let expandedKeys = ['0-0', '0-0-0', '0-0-0-0'];*/

    return <Tree className="draggable-tree"
                /* defaultExpandedKeys={expandedKeys}*/
                 draggable
                 onDragEnter={this.onDragEnter}
                 onDrop={this.onDrop}>

             {loop(dataSource)}

          </Tree>
  }
});

function mapStateToProps(state){
  return {
    calcResult: state.mergerForm.calcResult
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(tableBox)
