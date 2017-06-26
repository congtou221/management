import React from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';
import { connect } from 'react-redux';

require('./buyerList.scss');

const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;

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
          <FormItem {...formItemLayout} label="认购方股东名称">
            {getFieldDecorator(`buyer-${key}-name`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="认购方认购金额">
            {getFieldDecorator(`buyer-${key}-money`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="认购方认购股份数量">
            {getFieldDecorator(`buyer-${key}-amount`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="认购方认购价格">
            {getFieldDecorator(`buyer-${key}-price`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="认购前后持股比例变化">
            {getFieldDecorator(`buyer-${key}-precentage`)(
               <Input />
             )}
          </FormItem>

          <FormItem {...formItemLayout} label="是否大股东/关联方">
            {getFieldDecorator(`buyer-${key}-majorbuyer`, {
               initialValue: 'notRelated'
            })(
               <Select
                 showSearch
                 style={{ width: 200 }}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                 <Option value="major">大股东</Option>
                 <Option value="realted">关联方</Option>
                 <Option value="notRelated">不是大股东/关联方</Option>
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
               <Icon type="plus" />增加确定的认购方
             </Button>
           )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('unknow-buyer')(
             <Button type="dashed" onClick={this.addUnknowBuyer}>
               <Icon type="plus" />增加不确定的认购方
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

  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

const WrappedBuyerList = Form.create()(BuyerList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedBuyerList)
