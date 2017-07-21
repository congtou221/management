import React from 'react';
import {connect} from 'react-redux';
import { Tabs } from 'antd';

import Store from '../../../../store';
import If from '../../../common/if';

import TreeList from './treeList';

const TabPane = Tabs.TabPane;

let input = {};
let output = {};

const resultBox = React.createClass({
  componentDidMount(){
    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'increaseCalcResultReceived'){
        input = state.increaseForm.submitData;
        output = state.increaseForm.calcResult;
      }
      if(state.type === 'mergerCalcResultReceived'){
        input = state.mergerForm.submitData;debugger;
        output = state.mergerForm.calcResult;
      }
      if(state.type === 'holdingCalcResultReceived'){
        input = state.holdingForm.submitData;
        output = state.holdingForm.calcResult;
      }
    });
  },
  render(){

    return(
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="已录入数据" key="1">
            <If when={!$.isEmptyObject(this.props.input)}>
              <TreeList data={this.props.input} />
            </If>
          </TabPane>
          <TabPane tab="已录入数据 formatted" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="计算结果" key="3">
            <If when={!$.isEmptyObject(this.props.output)}>
              <TreeList data={this.props.output}/>
            </If>
          </TabPane>
          <TabPane tab="计算结果 formatted" key="4">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
        </Tabs>
      </div>
      )
  }
});

/* function mapStateToProps(state){
 *   return {
 *
 *   }
 * }
 *
 * function mapDispatchToProps(dispatch){
 *   return {
 *
 *   }
 * }
 *
 * export default connect(
 *   mapStateToProps,
 *   mapDispatchToProps
 * )(resultBox)*/

export default resultBox;
