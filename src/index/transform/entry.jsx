import React from 'react'
import { Input } from 'antd';

import If from '../common/if';
import InputBox from './inputBox/entry';
import TableBox from './tableBox/entry';

export default React.createClass({      
  getInitialState(){
    return{
      isShow: false
    }
  },
  // changeShow(){
  //   this.setState({isShow: !this.state.isShow})
  // },
  render() {
    return(
      <div id="container">
        <InputBox />
        <If when={this.state.isShow}>
          <TableBox />
        </If>
        <div onClick={() => {
            dispatch(SET_NAME(true))
          }}>clickHere</div>
      </div>
    )
  }
});
