import React from 'react';
import { Form, Input } from 'antd';

import { connect } from 'react-redux';

import Store from '../../../../../store';
import { updateObj } from '../../../util/updateFieldValue';

require('./buyerBriefIntro.scss');

const FormItem = Form.Item;

let tmpBriefIntroData = [];

const BriefIntro = React.createClass({
  componentDidMount(){
    let {
      form
    } = this.props;


    Store.subscribe(() => {
      let state = Store.getState();


      if(state.type === 'mergerSubmittedDataArrived' ){
        let newData = (() => {
          let submitData = state.mergerForm.submitData;
          let buyers = submitData["收购方股东简称"];

          if(!Array.isArray(buyers)){
            return;
          }

          return buyers.reduce((prev, cur, index) => {

            prev[`收购方股东简称-${index + 1}`] = cur;

            return prev;
          }, {})
        })();

        if(!newData){
          return;
        }

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
        收购方股东简称
        <FormItem {...formItemLayout} label="收购方1">
          {getFieldDecorator('收购方股东简称-1', {
          })(
            <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方2">
          {getFieldDecorator('收购方股东简称-2', {
          })(
             <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方3">
          {getFieldDecorator('收购方股东简称-3', {
          })(
             <Input />
           )}
        </FormItem>

        <FormItem {...formItemLayout} label="收购方4">
          {getFieldDecorator('收购方股东简称-4', {
          })(
             <Input />
           )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购方5">
          {getFieldDecorator('收购方股东简称-5', {
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

    /* 收购方股东简称待修改*/
    /* 注意：在提交数据后，需要把tmpBriefIntroData置空
     *   tmpBriefIntroData = [];
     */
    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpBriefIntroData[+name.slice(-1)] = value;

    props.submitData["收购方股东简称"] = tmpBriefIntroData;

  }
})(BriefIntro)

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
)(WrappedBriefIntro)
