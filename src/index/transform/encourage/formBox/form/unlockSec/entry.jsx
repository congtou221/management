import React from 'react';
import { Form, Radio, Input, Button, Icon, DatePicker} from 'antd';
import { connect } from 'react-redux';

import Store from '../../../../../../store';

import { updateObj } from '../../../../util/updateFieldValue';
import { fillBasicToForm } from '../../../../util/fillJsonToForm';

import ConditionOne from './condition';
import ConditionTwo from './condition2';

import If from '../../../../../common/if';

require('./style.scss');

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

let tmpUnlockData = {};

const UnlockSection = React.createClass({

  /* onRadioChange(e){
   *   let { dispatchShowRecruitSec } = this.props;
   *   dispatchShowRecruitSec(e.target.value);
   * },
   */
  componentDidMount(){
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'encourageSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: {
            "解锁条件关系": state.encourageForm.submitData["解锁条件关系"]
          }
        })
      }
    })
  },
  render(){
    let { form, showRecruitSec } = this.props;
    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }
    return (
      <div className="unlock-sec">

        <ConditionOne />

        <FormItem {...formItemLayout} label="解锁条件关系">
          {getFieldDecorator('解锁条件关系', {
          })(
             <RadioGroup >
               <Radio value="AND">AND</Radio>
               <Radio value="OR">OR</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <ConditionTwo />

      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    submitData: state.encourageForm.submitData
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const WrappedUnlockSection = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpUnlockData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpUnlockData
    });

    Object.assign(props.submitData, tmpUnlockData);

  }
})(UnlockSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUnlockSection)
