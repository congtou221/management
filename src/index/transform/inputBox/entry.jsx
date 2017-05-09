import React from 'react'
import { Input } from 'antd';


export default React.createClass({      
  getInitialState(){
    return{
      InputText: ''
    }
  },
  handleInput(e){
    this.setState({InputText: e.target.value});
  },
  render() {
    let {InputText} = this.state;

    return <Input 
        type="textarea" 
        placeholder="请输入..."
        value={InputText} 
        onInput={this.handleInput}
        autosize={{ minRows: 2, maxRows: 6}}/>;
  }
})
