import React from 'react'
import { Icon, Tree } from 'antd';
import { connect } from 'react-redux';

const TreeNode = Tree.TreeNode;

const tableBox = React.createClass({
  formatData(){
    let data = this.props.data;

    return data;
    /* let { calcResult } = state.increaseForm;*/

//    return calcResult.body;

    /* return calcResult;*/

//    let tmp = JSON.parse(calcResult.body);

//    return tmp.data.data;
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

    return <Tree className="draggable-tree"
                 draggable
                 onDragEnter={this.onDragEnter}
                 onDrop={this.onDrop}>

      {loop(dataSource)}

    </Tree>
  }
});

export default tableBox;
