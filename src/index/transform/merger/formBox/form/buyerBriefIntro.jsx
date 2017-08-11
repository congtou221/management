import React from 'react';
import { Form, Input, Row, Col } from 'antd';

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
      if(state.type === 'mergerHoldersReceived'){
        let holders = state.mergerForm.holders;

        form.setFieldsValue({
          holders: holders
        });

        let holdersname = holders.map(item => {
          return item.name;
        });

        let submitData = state.mergerForm.submitData;
        submitData["收购方股东简称"] = holdersname;
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
        收购方股东简称
        <Row gutter={16}>
          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
              label="收购方1"
              help={generateHelp(getFieldValue('holders')[0])}>
              {getFieldDecorator('收购方股东简称-1', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
                label="收购方2"
                help={generateHelp(getFieldValue('holders')[1])}>
             {getFieldDecorator('收购方股东简称-2', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
               label="收购方3"
               help={generateHelp(getFieldValue('holders')[2])}>
              {getFieldDecorator('收购方股东简称-3', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
                 label="收购方4"
                 help={generateHelp(getFieldValue('holders')[3])}>
              {getFieldDecorator('收购方股东简称-4', {
              })(
                 <Input />
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={4}>
            <FormItem {...formItemLayout}
                 label="收购方5"
                 help={generateHelp(getFieldValue('holders')[4])}>
              {getFieldDecorator('收购方股东简称-5', {
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

    /* 收购方股东简称待修改*/
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
