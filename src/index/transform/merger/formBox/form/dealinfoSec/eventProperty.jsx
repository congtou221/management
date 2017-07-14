import React from 'react';
import { Form, Input, Radio } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


let tmpEventpropData = {};

const EventProperty = React.createClass({

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="eventprop-wrapper">
        <FormItem {...formItemLayout} label="借壳">
          {getFieldDecorator('借壳', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产置出">
          {getFieldDecorator('资产置出', {
          })(
             <RadioGroup>
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

      </div>
    )
  }
})

const WrappedEventProperty = Form.create({
  onFieldsChange(props, changedFields){
    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpEventpropData[name] = value;

    if(typeof props.submitData["交易信息"] == 'undefined'){
      props.submitData["交易信息"] = {};
    }

    props.submitData["交易信息"]["事件性质"] = tmpEventpropData;

  }
})(EventProperty)

function mapStateToProps(state) {
  return {
    submitData: state.mergerForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEventProperty)
