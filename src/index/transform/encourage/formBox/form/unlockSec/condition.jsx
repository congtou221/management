import React from 'react';
import { Form, Input, Button, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';

require('./condition.scss');

const FormItem = Form.Item;

let uuid = 5;

const UnlockyearList = React.createClass({
  addUnlockyear(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const unlockyearKeys = getFieldValue('unlockyearKeys');

    uuid++;
    unlockyearKeys.push(uuid);

    setFieldsValue({
      unlockyearKeys: unlockyearKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const unlockyearKeys = getFieldValue('unlockyearKeys');

    setFieldsValue({
      unlockyearKeys: unlockyearKeys.filter(key => key !==k )
    });
  },

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;
    let formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    }

    getFieldDecorator('unlockyearKeys', {initialValue: [1, 2, 3, 4, 5]});
    const unlockyearKeys = getFieldValue('unlockyearKeys');

    let list = unlockyearKeys.map((key, index) => {
      return (
        <div className="unlockyear-item" key={key}>

          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />
          <FormItem
            className="unlockyear-item-formitem"
            {...formItemLayout}
            label="解锁年"
          >
            {getFieldDecorator(`unlockyear-${key}-date`)(
               <DatePicker />
             )}
          </FormItem>
          <FormItem
            className="unlockyear-item-formitem"
            {...formItemLayout}
            label="解锁数值"
          >
            {getFieldDecorator(`unlockyear-${key}-number`)(
               <Input />
             )}
          </FormItem>
          <FormItem
            className="unlockyear-item-formitem"
            {...formItemLayout}
            label="解锁增长率"
          >
            {getFieldDecorator(`unlockyear-${key}-rate`)(
               <Input />
             )}
          </FormItem>

        </div>
      )
    })

    return (
      <div className="unlockyear-list">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('know-buyer')(
             <Button type="dashed" onClick={this.addUnlockyear}>
               <Icon type="plus" />增加解锁年
             </Button>
           )}
        </FormItem>

        <div className="unlockyear-item-wrapper">
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

const WrappedUnlockyearList = Form.create()(UnlockyearList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUnlockyearList)
