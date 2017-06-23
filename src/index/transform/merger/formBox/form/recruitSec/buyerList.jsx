import React from 'react';
import { Form, Input } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;

const BuyerList = React.createClass({
  render(){
    let { form, buyerList } = this.props;
    let { getFieldDecorator } = form;
    let formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    }

    let list = buyerList.map((key, index) => {
      return (
        <div className="recruit-buyeritem" key={key}>
          <FormItem {...formItemLayout} label="配募方股东名称">
            {getFieldDecorator(`buyer-${key}-name`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募方认购金额">
            {getFieldDecorator(`buyer-${key}-money`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募方认购股份数量">
            {getFieldDecorator(`buyer-${key}-amount`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募方认购价格">
            {getFieldDecorator(`buyer-${key}-price`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="配募前后持股比例变化">
            {getFieldDecorator(`buyer-${key}-precentage`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="是否大股东/关联方">
            {getFieldDecorator(`buyer-${key}-name`)(
               <Input />
             )}
          </FormItem>

        </div>
      )
    })

    return (
      <div className="recruit-buyeritem-wrapper">
        {list}
      </div>
    )
  }
})

function mapStateToProps(state){
  return {
    buyerNumber: state.mergerForm.recruitBuyerNumber,
    buyerList: state.mergerForm.recruitBuyerList
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
