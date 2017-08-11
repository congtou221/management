import React from 'react';
import { Form, Input, InputNumber, Button, Icon, Select, Radio, Row, Col } from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../../store';
import { updateArray } from '../../../../util/updateFieldValue';
import { fillVariableArrToForm } from '../../../../util/fillJsonToForm';
import toThousands from '../../../../util/toThousands';

require('./buyerList.scss');

const FormItem = Form.Item;
const Option = Select.Option;
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
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'increaseSubmittedDataArrived'){
        fillVariableArrToForm({
          form: form,
          data: state.increaseForm.submitData["增发对象"],
          keyname: 'buyerKeys'
        })
        /* form.setFieldsValue({
         *   'buyerKeys': [1, 2]
         * })*/
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
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="认购方股东名称">
                {getFieldDecorator(`名称-${key}`)(
                   <Input />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="认购方认购金额">
                {getFieldDecorator(`认购金额-${key}`)(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="认购方认购数量">
                {getFieldDecorator(`认购数量-${key}`)(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
            {/* <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="认购方认购价格">
                {getFieldDecorator(`认购价格-${key}`)(
                <InputNumber
                formatter={value => toThousands(value)}
                />
                )}
                </FormItem>
                </Col> */}
            {/* <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="认购前后持股比例变化">
                {getFieldDecorator(`持股比例变化-${key}`)(
                <InputNumber
                formatter={value => toThousands(value)}
                />
                )}
                </FormItem>
                </Col> */}
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="是否大股东/关联方">
                {getFieldDecorator(`关联关系-${key}`, {
                   initialValue: ''
                })(
                   <Select>
                     <Option value="大股东">大股东</Option>
                     <Option value="关联方">关联方</Option>
                     <Option value="">不是大股东/关联方</Option>
                   </Select>
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
            <FormItem {...formItemLayout} label="确定的认购方">
              {getFieldDecorator('know-buyer')(
                 <Button type="dashed" onClick={this.addKnowBuyer}>
                   <Icon type="plus" />增加
                 </Button>
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="不确定的认购方">
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
    submitData: state.increaseForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

const WrappedBuyerList = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpBuyerlistData = updateArray({
      props: props,
      changedFields: changedFields,
      addKey: 'buyerKeys',
      tmpData: tmpBuyerlistData
    })
    /* let changeItem = Object.keys(changedFields)[0];

     * if(changeItem === 'buyerKeys'){
     *   let changedArr = changedFields[changeItem].value;

     *   let filtered = tmpBuyerlistData.filter((value) => {
     *     if(!value.key){
     *       return false;
     *     }
     *     if(changedArr.indexOf(value.key) > -1){
     *       return true;
     *     }
     *     return false;
     *   })

     *   let newArr = changedArr.map((key, index) => {
     *     if(filtered.indexOf(key) < 0){
     *       return {key : key}
     *     }
     *     return tmpBuyerlistData.find(item => {
     *       return item.key == key;
     *     })
     *   });

     *   tmpBuyerlistData = newArr;
     * }else {

     *   let {name, value} = changedFields[changeItem];
     *   let index = name.slice(-1);
     *   let nameWithoutIndex = name.slice(0, -2);

     *   let tmpArr = tmpBuyerlistData;

     *   tmpBuyerlistData = tmpArr.map((item) => {
     *     if(item.key == +index){
     *       item[nameWithoutIndex] = value;
     *       return item;
     *     }
     *     return item;
     *   })

     * }
     */
    /* if(typeof props.submitData["交易信息"] == "undefined" ){
     *   props.submitData["交易信息"] = {};
     * }
     * if(typeof props.submitData["交易信息"]["认购"] == "undefined"){
     *   props.submitData["交易信息"]["认购"] = {};
     * }
     */
    props.submitData["增发对象"] = tmpBuyerlistData;
  }
})(BuyerList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedBuyerList)
