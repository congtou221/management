import React from 'react';
import { Form, Radio, Input, Button, Icon, DatePicker} from 'antd';
import { connect } from 'react-redux';

import Condition from './condition';
import If from '../../../../../common/if';

require('./style.scss');

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const UnlockSection = React.createClass({

  /* onRadioChange(e){
   *   let { dispatchShowRecruitSec } = this.props;
   *   dispatchShowRecruitSec(e.target.value);
   * },
   */

  render(){
    let { form, showRecruitSec } = this.props;
    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }
    return (
      <div className="unlock-sec">
        <Condition />
        <FormItem {...formItemLayout} label="条件1与条件2的关系">
          {getFieldDecorator('recruit', {
            initialValue: "and"
          })(
             <RadioGroup >
               <Radio value="and">AND</Radio>
               <Radio value="or">OR</Radio>
             </RadioGroup>
           )}
        </FormItem>
        <Condition />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const WrappedUnlockSection = Form.create()(UnlockSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUnlockSection)
