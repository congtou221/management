import React from 'react';
import { Form, Input, InputNumber, Select, Button, Icon } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

require('./shareholder.scss');

let uuid = 0;

let tmpShareholderData = [];

let companyId;

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

  componentDidMount(){
    companyId = $(this.refs.shareholderItem).parent().parent().data("key");
   // companyId = $(this.ref.shareholderItem).parent().parent().data("key");
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
            {getFieldDecorator(`股东名称-${key}`, {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="股东简称"
          >
            {getFieldDecorator(`股东简称-${key}`, {

            })(
               <Input />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="持股比例"
          >
            {getFieldDecorator(`持股比例-${key}`, {

            })(
               <InputNumber />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="股份收购数量"
          >
            {getFieldDecorator(`股份收购数量-${key}`, {

            })(
               <InputNumber />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="收购比例"
          >
            {getFieldDecorator(`收购比例-${key}`, {

            })(
               <InputNumber />
             )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否收购方大股东"
          >
            {getFieldDecorator(`是否大股东-${key}`, {
               initialValue: 'notRelated'
            })(
               <Select
                 showSearch
                 style={{ width: 200 }}
                 optionFilterProp="children"
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                 <Option value="大股东">大股东</Option>
                 <Option value="关联方">关联方</Option>
                 <Option value="false">不是大股东/关联方</Option>
               </Select>
             )}
          </FormItem>

        </div>
      )

    });

    return (
      <div className="shareholder-list" ref="shareholderItem">
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

const WrappedShareholder = Form.create({
  onFieldsChange(props, changedFields){

    let changeItem = Object.keys(changedFields)[0];

    if(changeItem == 'shareholderKeys'){
      let changedArr = changedFields[changeItem].value;

      let filtered = tmpShareholderData.filter(value => {
        if(!value.key){
          return false;
        }
        if(changedArr.indexOf(value.key) > -1){
          return true;
        }
        return false;
      })

      let newArr = changedArr.map(key => {
        if(filtered.indexOf(key) < 0){
          return {key: key}
        }
        return tmpShareholderData.find(item => {
          return item.key == key;
        })
      })

      tmpShareholderData = newArr;
    } else {
      let {name, value} = changedFields[changeItem];
      let index = name.slice(-1);
      let nameWithoutIndex = name.slice(0, -2);

      let tmpArr = tmpShareholderData;

      tmpShareholderData = tmpArr.map(item => {
        if(item.key == +index){
          item[nameWithoutIndex] = value;
          return item;
        }
        return item;
      })

      if(typeof props.submitData["被收购公司"] == 'undefined'){
        props.submitData["被收购公司"] = [];
      }

      let tmpCompanyList = props.submitData["被收购公司"];

      let tmpCompanyCalcResult = tmpCompanyList.map(item => {
        if(item.key == companyId){
          item["股东信息"] = tmpShareholderData;
          return item;
        }
        return item;
      })
      props.submitData["被收购公司"] = tmpCompanyCalcResult;
      console.log(props.submitData["被收购公司"]);

    }
  }
})(Shareholder)

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
)(WrappedShareholder)
