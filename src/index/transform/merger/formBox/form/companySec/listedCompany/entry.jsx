import React from 'react';
import { Form, Input } from 'antd';

import { connect } from 'react-redux';

const FormItem = Form.Item;

const ListedCompany = React.createClass({

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }


    return (
      <div className="listed-company">

        <label>上市公司</label>

        <FormItem {...formItemLayout} label="股票代码">
          { getFieldDecorator('listCompanyId', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="换股价">
          { getFieldDecorator('listCompanyPrice', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="换股比例">
          { getFieldDecorator('listCompanyRate', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购价格">
          { getFieldDecorator('listCompanySalePrice', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购比例">
          { getFieldDecorator('listCompanySaleRate', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购金额">
          { getFieldDecorator('listCompanySaleMoney', {

          })(
              <Input />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="收购现金">
          { getFieldDecorator('listCompanySaleCash', {

          })(
              <Input />
            )}
        </FormItem>

      </div>
    )
  }
})

const WrappedListedCompany = Form.create()(ListedCompany)

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedListedCompany)
