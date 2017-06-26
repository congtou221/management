import React from 'react';
import { Form,  Input, Select, Button, Icon } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

require('./shareholder.scss');

let uuid = 0;

const Shareholder = React.createClass({

  addShareholder(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const shareholderKeys = getFieldValue('shareholderKeys');

    uuid++;
    shareholderKeys.push(uuid);

    setFieldsValue({
      shareholderKeys: shareholderKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const shareholderKeys = getFieldValue('shareholderKeys');

    setFieldsValue({
      shareholderKeys: shareholderKeys.filter(key => key !==k )
    })
  },

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14}
    }


    getFieldDecorator('shareholderKeys', { initialValue: [] });
    const shareholderKeys = getFieldValue('shareholderKeys');

    let list = shareholderKeys.map((key, index) => {
      return (
        <div className="shareholder-item" key={key}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={ () => this.remove(key) }
          />

          <FormItem
            {...formItemLayout}
            label="股东名称"
          >
            {getFieldDecorator('shareholder-name', {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="股东简称"
          >
            {getFieldDecorator('shareholder-simple-name', {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="持股比例"
          >
            {getFieldDecorator('shareholder-hold-percent', {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="股份收购数量"
          >
            {getFieldDecorator('shareholder-amount', {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="收购比例"
          >
            {getFieldDecorator('shareholder-purchase-percent', {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否收购方大股东"
          >
            {getFieldDecorator('is-majorshareholder', {
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

    });

    return (
      <div className="shareholder-list">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('add-shareholder')(
             <Button type="dashed" onClick={this.addShareholder}>
               <Icon type="plus" />增加股东
             </Button>
           )}
        </FormItem>

        <div className="shareholder-item-wrapper">
          {list}
        </div>


      </div>
    )
  }
})

const WrappedShareholder = Form.create()(Shareholder)

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedShareholder)
