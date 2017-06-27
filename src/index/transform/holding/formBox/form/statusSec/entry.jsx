import React from 'react';
import { Form, Radio, Input, Button, Icon, Select} from 'antd';
import { connect } from 'react-redux';

import If from '../../../../../common/if';

require('./style.scss');

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const StatusSection = React.createClass({
  /*
   *   onRadioChange(e){
   *     let { dispatchShowRecruitSec } = this.props;
   *     dispatchShowRecruitSec(e.target.value);
   *   },
   * */

  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }
    return (
      <div className="status-sec">
        <FormItem {...formItemLayout} label="增减持状态">
          {getFieldDecorator('status', {
            initialValue: 'plan'
          })(
             <RadioGroup >
               <Radio value="plan">计划</Radio>
               <Radio value="proceed">进展</Radio>
               <Radio value="finish">结束</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <If when={getFieldValue('status') == 'plan'}>
          <div className="status-detail">

            <div className="floor-status-detail">
              <FormItem {...formItemLayout} label="下限成本价">
                {getFieldDecorator('floor-price')(
                   <Input />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="下限股份数量">
                {getFieldDecorator('floor-amount')(
                   <Input />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="下限金额">
                {getFieldDecorator('floor-money')(
                   <Input />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="下限占股比">
                {getFieldDecorator('floor-precent')(
                   <Input />
                 )}
              </FormItem>
            </div>

            <div className="ceiling-status-detail">
              <FormItem {...formItemLayout} label="上限成本价">
                {getFieldDecorator('ceiling-price')(
                   <Input />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="上限股份数量">
                {getFieldDecorator('ceiling-amount')(
                   <Input />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="上限金额">
                {getFieldDecorator('ceiling-money')(
                   <Input />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="上限占股比">
                {getFieldDecorator('ceiling-precent')(
                   <Input />
                 )}
              </FormItem>
            </div>

          </div>
        </If>
        <If when={getFieldValue('status') == 'proceed' || getFieldValue('status') == 'finish'}>

          <div className="status-detail">
            <FormItem {...formItemLayout} label="成本价">
              {getFieldDecorator('floor-price')(
                 <Input />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="股份数量">
              {getFieldDecorator('floor-amount')(
                 <Input />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="金额">
              {getFieldDecorator('floor-money')(
                 <Input />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="占股比">
              {getFieldDecorator('floor-precent')(
                 <Input />
               )}
            </FormItem>
          </div>

        </If>
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

const WrappedStatusSection = Form.create()(StatusSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedStatusSection)
