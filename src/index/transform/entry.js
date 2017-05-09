import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { DatePicker } from 'antd';

var store = require('./store');
var setNameActionCreator = require('./action.js');


export default React.createClass({      
  componentDidMount(){
    store.dispatch(setNameActionCreator('bob'));
  },
  render() {
    return <DatePicker />;
  }
})
