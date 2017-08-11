import React from 'react';
import { Form, Input, Col, Row } from 'antd';

import { connect } from 'react-redux';

import Store from '../../../../../store';



const FormItem = Form.Item;

let tmpBriefIntroData = [];

const BriefIntro = React.createClass({
  componentDidMount(){
    let {
      form,
      submitData
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

      if(state.type === 'increaseHoldersReceived'){
        let holders = state.increaseForm.holders;

        form.setFieldsValue({
          holders: holders
        });

        let holdersname = holders.map(item => {
          return item.name;
        })

        let submitData = state.increaseForm.submitData;
        submitData["股东简称"] = holdersname;
        tmpBriefIntroData = holdersname;
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

    getFieldDecorator('holders', {initialValue: []});

    let generateHelp = data => {
      if(data && data.name && data.ratio){
        return data.name + ": " + data.ratio + "%";
      }
      return "";
    }

    return (
      <div className="briefintro-wrapper">
        股东简称
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
               label="股东1"
               help={generateHelp(getFieldValue('holders')[0])}>
              {getFieldDecorator('股东简称-1', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
               label="股东2"
               help={generateHelp(getFieldValue('holders')[1])}>
              {getFieldDecorator('股东简称-2', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
               label="股东3"
               help={generateHelp(getFieldValue('holders')[2])}>
              {getFieldDecorator('股东简称-3', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
           <FormItem {...formItemLayout}
              label="股东4"
               help={generateHelp(getFieldValue('holders')[3])}>
              {getFieldDecorator('股东简称-4', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
           <FormItem {...formItemLayout}
              label="股东5"
              help={generateHelp(getFieldValue('holders')[4])}>
              {getFieldDecorator('股东简称-5', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>
        </Row>

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

    let reg = /-(\d+)$/;

    if(!reg.exec(name)){
      return;
    }

    let index = reg.exec(name)[1];

    tmpBriefIntroData[+index - 1] = value;

    props.submitData["股东简称"] = tmpBriefIntroData;

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
