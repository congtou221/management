import React from 'react';
import { Form, Input } from 'antd';

import { connect } from 'react-redux';

import Store from '../../../../../store';



const FormItem = Form.Item;

let tmpBriefIntroData = [];

const BriefIntro = React.createClass({
  componentDidMount(){
    let {
      form
    } = this.props;


    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'increaseSubmittedDataArrived' ){
        let newData = (() => {
          let submitData = state.increaseForm.submitData;
          let buyers = submitData["股东简称"];

          if(!Array.isArray(buyers)){
            return;
          }

          return buyers.reduce((prev, cur, index) => {

            prev[`股东简称-${index + 1}`] = cur;

            return prev;
          }, {})
        })();

        form.setFieldsValue(newData);

      }

    })
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="briefintro-wrapper">
        股东简称
        <FormItem {...formItemLayout} label="股东1">
          {getFieldDecorator('股东简称-1', {
          })(
            <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="股东2">
          {getFieldDecorator('股东简称-2', {
          })(
             <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="股东3">
          {getFieldDecorator('股东简称-3', {
          })(
             <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="股东4">
          {getFieldDecorator('股东简称-4', {
          })(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="股东5">
          {getFieldDecorator('股东简称-5', {
          })(
             <Input />
           )}
        </FormItem>

      </div>
    )
  }
})

const WrappedBriefIntro = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    /* 注意：在提交数据后，需要把tmpBriefIntroData置空
     *   tmpBriefIntroData = [];
     */
    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpBriefIntroData.push(value);

    props.submitData["股东简称"] = tmpBriefIntroData.slice(0, 5);

  }
})(BriefIntro)

function mapStateToProps(state) {
  return {
    submitData: state.increaseForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedBriefIntro)
