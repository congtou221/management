import React from 'react';
import { Form, Input, InputNumber, Button, Icon, Select, Radio, Col, Row } from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../../store';
import { fillArrLenToForm, fillArrToForm } from '../../../../util/fillJsonToForm';
import { updateArray } from '../../../../util/updateFieldValue';
import toThousands from '../../../../util/toThousands';

require('./buyerList.scss');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let uuid = 0;
let tmpBuyerlistData = [];

const BuyerList = React.createClass({
  addKnowBuyer(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const buyerKeys = getFieldValue('buyerKeys');

    uuid++;
    buyerKeys.push({id: uuid, type: 'know'});

    setFieldsValue({
      buyerKeys: buyerKeys
    })
  },

  addUnknowBuyer(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const buyerKeys = getFieldValue('buyerKeys');

    uuid++;
    buyerKeys.push({id: uuid, type: 'unknow'});

    setFieldsValue({
      buyerKeys: buyerKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const buyerKeys = getFieldValue('buyerKeys');

    setFieldsValue({
      buyerKeys: buyerKeys.filter(item => item.id !==k )
    });
  },

  componentDidMount(){
    let {
      form
    } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'mergerSubmittedDataArrived'){
        let submitData = state.mergerForm.submitData;
        let dealinfo = submitData["交易信息"] || {};
        let recruit = dealinfo["配募"] || {};
        let buyers = recruit["配募方"] || [];

        buyers = buyers.filter(item => {
          return (typeof item !== 'undefined');
        });

        fillArrLenToForm({
          form: form,
          keys: buyers.map(item => {return {id: item.key, type: item["股东名称"]=="待定"?"unknow":"know"}}),
          keyname:'buyerKeys'
        });

        fillArrToForm({
          form: form,
          data: buyers
        });
      }
    })

  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;
    let formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }

    getFieldDecorator('buyerKeys', {initialValue: []});
    const buyerKeys = getFieldValue('buyerKeys');

    let list = buyerKeys.map((item, index) => {
      let key = item.id;
      let type = item.type;

      return (
        <div className="recruit-buyeritem" key={key}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />
          <br/>
          <label>{type=='know' ? '确定的配募方' : '不确定的配募方'}</label>

          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="配募方股东名称">
                {getFieldDecorator(`股东名称-${key}`)(
                   <Input />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="配募方认购金额">
                {getFieldDecorator(`认购金额-${key}`)(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="配募方认购股份数量">
                {getFieldDecorator(`认购股份数-${key}`)(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="是否大股东/关联方">
                {getFieldDecorator(`关联方-${key}`, {
                   initialValue: "true"
                })(
                   <RadioGroup>
                     <Radio value={true}>是</Radio>
                     <Radio value={false}>否</Radio>
                   </RadioGroup>
                 )}
              </FormItem>
            </Col>
          </Row>

        </div>
      )
    })

    return (
      <div className="recruit-buyerlist">
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="确定的配募方">
              {getFieldDecorator('know-buyer')(
                 <Button type="dashed" onClick={this.addKnowBuyer}>
                   <Icon type="plus" />增加
                 </Button>
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="不确定的配募方">
              {getFieldDecorator('unknow-buyer')(
                 <Button type="dashed" onClick={this.addUnknowBuyer}>
                   <Icon type="plus" />增加
                 </Button>
               )}
            </FormItem>
          </Col>
        </Row>
        <div className="recruit-buyeritem-wrapper">
          {list}
        </div>

      </div>

    )
  }
})

function mapStateToProps(state){
  return {
    submitData: state.mergerForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

const WrappedBuyerList = Form.create({
  onFieldsChange(props, changedFields) {
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpBuyerlistData = updateArray({
      props: props,
      changedFields: changedFields,
      addKey: 'buyerKeys',
      tmpData: tmpBuyerlistData
    })

    if(typeof props.submitData["交易信息"] == "undefined" ){
      props.submitData["交易信息"] = {};
    }
    if(typeof props.submitData["交易信息"]["配募"] == "undefined"){
      props.submitData["交易信息"]["配募"] = {};
    }

    props.submitData["交易信息"]["配募"]["配募方"] = tmpBuyerlistData;

  }
})(BuyerList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedBuyerList)
