import React from 'react';
import { Form, Input } from 'antd';

import FinancialData from './financialData';
import Shareholder from './shareholder';


import { connect } from 'react-redux';

const FormItem = Form.Item;

const UnlistedCompany = React.createClass({

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }


    return (
      <div className="unlisted-company">

        <label>非上市公司</label>

        <FormItem {...formItemLayout} label="公司名称">
          { getFieldDecorator('unlistedCompanyName', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="交易总金额">
          { getFieldDecorator('unlistCompanyDealMoney', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购现金">
          { getFieldDecorator('unlistCompanyDealCash', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购价格">
          { getFieldDecorator('unlistCompanyDealPrice', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购比例">
          { getFieldDecorator('unlistCompanyDealRate', {

          })(
              <Input />
            )}
        </FormItem>

        <FinancialData />
        <Shareholder />

      </div>
    )
  }
})

const WrappedUnlistedCompany = Form.create()(UnlistedCompany)

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUnlistedCompany)
