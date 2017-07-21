import React from 'react';
import { Form, Radio, Icon, Button } from 'antd';

import { connect } from 'react-redux';

/* 上市公司模块*/
import ListedCompany from './listedCompany/entry';
/* 非上市公司模块*/
import UnlistedCompany from './unlistedCompany/entry';

import If from '../../../../../common/if';
import Store from '../../../../../../store';

require('./style.scss');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let tmpCompanyData = [];

let uuid = 0;
const CompanySection = React.createClass({

  addListedCompany(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const companyKeys = getFieldValue('companyKeys');

    uuid++;
    companyKeys.push({
      type: 'list',
      key: uuid
    })

    setFieldsValue({
      companyKeys: companyKeys
    })
  },
  addUnlistedCompany(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const companyKeys = getFieldValue('companyKeys');

    uuid++;
    companyKeys.push({
      type: 'unlist',
      key: uuid
    })


    setFieldsValue({
      companyKeys: companyKeys
    })
  },
  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const companyKeys = getFieldValue('companyKeys');

    setFieldsValue({
      companyKeys: companyKeys.filter(keyObj => keyObj.key !==k )
    })

  },
  componentDidMount(){
    /* json回填表单*/
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'mergerSubmittedDataArrived'){
        let submitData = state.mergerForm.submitData;
        let companys = submitData["被收购公司"];

        let keys = companys.map(item => {
          return {
            type: item['上市公司'] ? 'list' : 'unlist',
            key: item['key']
          }
        })

        form.setFieldsValue({
          companyKeys: keys
        })

      }
    })
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }

    getFieldDecorator('companyKeys', {initialValue: []});
    const companyKeys = getFieldValue('companyKeys');

    let list = companyKeys.map((keyObj, index) => {
      let { key, type }  = keyObj;
      return (
        <div className="company-item" key={key} data-key={key} >
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />

          <If when={ type === 'list' }>
            {/* 上市公司 */}
            <ListedCompany />
          </If>

          <If when={ type === 'unlist' }>
            {/* 非上市公司 */}
            <UnlistedCompany />
          </If>

        </div>
      )
    })

    return (
      <div className="company-sec">

        <div className="company-list">
          <FormItem {...formItemLayout}>
            {getFieldDecorator('listedCompany')(
               <Button type="dashed" onClick={this.addListedCompany}>
                 <Icon type="plus" />增加上市公司信息
               </Button>
             )}
          </FormItem>

          <FormItem {...formItemLayout}>
            {getFieldDecorator('unlistedCompany')(
              <Button type="dashed" onClick={this.addUnlistedCompany}>
                 <Icon type="plus" />增加非上市公司信息
              </Button>
             )}
          </FormItem>

          <div className="company-item-wrapper">
            {list}
          </div>

        </div>

      </div>
    )
  }}

)

const WrappedCompanySection = Form.create({
  onFieldsChange(props, changedFields){

    let tmpCompanyData = props.submitData["被收购公司"] || [];

    let changeItem = Object.keys(changedFields)[0];

    if(changeItem === 'companyKeys'){
      let changedArr = changedFields[changeItem].value;

      let filtered = tmpCompanyData.filter((value) => {
        if(!value.key){
          return false;
        }
        if(changedArr.indexOf(value.key) > -1){
          return true;
        }
        return false;
      })

      let newArr = changedArr.map((changedItem) => {
        if(filtered.indexOf(changedItem.key) < 0){
          return {key: changedItem.key, "上市公司": changedItem.type === "list" }
        }
        return tmpCompanyData.find((item) => {
          return item.key == changedItem.key;
        })
      })

      tmpCompanyData = newArr;
    }

    props.submitData["被收购公司"] = tmpCompanyData;

  }
})(CompanySection);

function mapStateToProps(state) {
  return {
    submitData: state.mergerForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCompanySection)
