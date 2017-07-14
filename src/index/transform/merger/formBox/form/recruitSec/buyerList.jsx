import React from 'react';
import { Form, Input, InputNumber, Button, Icon, Select } from 'antd';
import { connect } from 'react-redux';

require('./buyerList.scss');

const FormItem = Form.Item;
const Option = Select.Option;

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
               initialValue: 'notRelated'
            })(
               <Select
                 showSearch
                 style={{ width: 200 }}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                 <Option value="true">大股东</Option>
                 <Option value="true">关联方</Option>
                 <Option value="false">不是大股东/关联方</Option>
               </Select>
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

    let changeItem = Object.keys(changedFields)[0];

    if(changeItem === 'buyerKeys'){
      let changedArr = changedFields[changeItem].value;

      let filtered = tmpBuyerlistData.filter((value) => {debugger;
        if(!value.key){
          return false;
        }
        if(changedArr.indexOf(value.key) > -1){
          return true;
        }
        return false;

      })

      let newArr = changedArr.map((key, index) => {
        if(filtered.indexOf(key) < 0){
          return {key : key}
        }
        return tmpBuyerlistData.find((item) => {
          return item.key == key;
        })
      })

      tmpBuyerlistData = newArr;

    } else {

      let {name, value} = changedFields[changeItem];
      let index = name.slice(-1);
      let nameWithoutIndex = name.slice(0, -2);

      let tmpArr = tmpBuyerlistData;

      tmpBuyerlistData = tmpArr.map((item) => {
        if(item.key == +index){
          item[nameWithoutIndex] = value;
          return item;
        }
        return item;
      })

    }

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
