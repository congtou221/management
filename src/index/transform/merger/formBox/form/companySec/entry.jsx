import React from 'react';
import { Form, Radio } from 'antd';

import { connect } from 'react-redux';

/* 上市公司模块*/
import ListedCompany from './listedCompany/entry';
/* 非上市公司模块*/
import UnlistedCompany from './unlistedCompany/entry';

import If from '../../../../../common/if';

require('./style.scss');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CompanySection = React.createClass({

  handleRadioChange(){

  },

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }

    return (
      <div className="company-sec">
        <FormItem {...formItemLayout} label="被收购公司是否为上市公司">
          { getFieldDecorator('isListed', {
              initialValue: true
          })(
              <RadioGroup onChange={this.handleRadioChange}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
        </FormItem>

        <If when={ getFieldValue('isListed') }>
          {/* 上市公司 */}
          <ListedCompany />
        </If>

        <If when={ !getFieldValue('isListed')}>
          {/* 非上市公司 */}
          <UnlistedCompany />
        </If>

      </div>
    )
  }}

)

const WrappedCompanySection = Form.create()(CompanySection);

function mapStateToProps(state) {
  return {

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
