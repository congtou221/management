import React from 'react';
import { Form, Input, InputNumber, Button, Icon, Select, Radio } from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../../store';
import { fillVariableArrToForm } from '../../../../util/fillJsonToForm';
import { updateArray } from '../../../../util/updateFieldValue';

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
    buyerKeys.push(uuid);

    setFieldsValue({
      buyerKeys: buyerKeys
    })
  },

  addUnknowBuyer(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const buyerKeys = getFieldValue('buyerKeys');

    uuid++;
    buyerKeys.push(uuid);

    setFieldsValue({
      buyerKeys: buyerKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const buyerKeys = getFieldValue('buyerKeys');

    setFieldsValue({
      buyerKeys: buyerKeys.filter(key => key !==k )
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
        let buyers = submitData["交易信息"]["配募"]["配募方"];

        fillVariableArrToForm({
          form: form,
          data: buyers,
          keyname: 'buyerKeys'
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

    let list = buyerKeys.map((key, index) => {
      return (
        <div className="recruit-buyeritem" key={key}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />
          <FormItem {...formItemLayout} label="配募方股东名称">
            {getFieldDecorator(`股东名称-${key}`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募方认购金额">
            {getFieldDecorator(`认购金额-${key}`)(
               <InputNumber />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募方认购股份数量">
            {getFieldDecorator(`认购股份数-${key}`)(
               <InputNumber />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募方认购价格">
            {getFieldDecorator(`认购价格-${key}`)(
               <InputNumber />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募前后持股比例变化">
            {getFieldDecorator(`持股比例变化-${key}`)(
               <Input />
             )}
          </FormItem>
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

        </div>
      )
    })

    return (
      <div className="recruit-buyerlist">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('know-buyer')(
             <Button type="dashed" onClick={this.addKnowBuyer}>
               <Icon type="plus" />增加确定的配募方
             </Button>
           )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('unknow-buyer')(
             <Button type="dashed" onClick={this.addUnknowBuyer}>
               <Icon type="plus" />增加不确定的配募方
             </Button>
           )}
        </FormItem>

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
