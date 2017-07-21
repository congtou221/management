import React from 'react';
import { Form, Input, InputNumber, Select, Button, Icon, Radio } from 'antd';

import { connect } from 'react-redux';

import Store from '../../../../../../../store';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
    /* 获取DOM节点上的key*/
    companyId = $(this.refs.shareholderItem).parent().parent().data("key");

    /* 回填json*/
    let { form } = this.props;

    let state = Store.getState();
    if(state.type === 'mergerSubmittedDataArrived'){
      let submitData = state.mergerForm.submitData;
      let companys = submitData["被收购公司"];

      let company = companys.filter(item => {
        return item.key === companyId;
      })[0];

      let financialData = company["股东信息"];

      let keys = financialData.map(item => {
        return item.key;
      })

      form.setFieldsValue({
        'shareholderKeys': keys
      })

      setTimeout(() => {
        financialData.forEach(item => {
          let key = item.key;

          delete item.key;
          let newData = Object.keys(item).reduce((prev, cur) => {

            prev[`${cur}-${key}`] = item[cur];

            form.setFieldsValue({

            })

            return prev;
          }, {});

          form.setFieldsValue(newData);
        })

      }, 2000)
    }
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
            {getFieldDecorator(`关联方-${key}`, {
               initialValue: 'notRelated'
            })(
               <RadioGroup>
                 <Radio value={true}>是</Radio>
                 <Radio value={false}>否</Radio>
               </RadioGroup>

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
    if($.isEmptyObject(changedFields)){
      return;
    }

    let updateValues = (changeItem) => {

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
          let keys = filtered.map(item => {
            return item.key;
          })
          if(keys.indexOf(key) < 0){
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
      }
    }

    Object.keys(changedFields).forEach(changeItem => {
      updateValues(changeItem);
    })

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
