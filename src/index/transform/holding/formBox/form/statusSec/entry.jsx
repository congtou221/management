import React from 'react';
import { Form, Radio, Input, InputNumber, Button, Icon, Select} from 'antd';
import { connect } from 'react-redux';

import Store from '../../../../../../store';
import { updateObj } from '../../../../util/updateFieldValue';
import { fillBasicToForm } from '../../../../util/fillJsonToForm';

import If from '../../../../../common/if';

require('./style.scss');

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

let tmpSatusData = {};

const StatusSection = React.createClass({

  componentDidMount(){

    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'holdingSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.holdingForm.submitData["增减持"]
        })
      }
    })
  },
  render(){
    let { form, statusKey } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }

    getFieldDecorator('formItemKey');

    return (
      <div className="status-sec" ref="formItem">
        <FormItem {...formItemLayout} label="增减持状态">
          {getFieldDecorator(`增减持状态-${statusKey}`, {
            initialValue: '计划'
          })(
             <RadioGroup >
               <Radio value="计划">计划</Radio>
               <Radio value="进展">进展</Radio>
               <Radio value="结束">结束</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <If when={getFieldValue(`增减持状态-${statusKey}`) == '计划'}>
          <div className="status-detail">

            <div className="floor-status-detail">
              <FormItem {...formItemLayout} label="下限成本价">
                {getFieldDecorator(`下限成本价-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="下限股份数量">
                {getFieldDecorator(`下限股份数量-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="下限金额">
                {getFieldDecorator(`下限金额-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="下限占股比">
                {getFieldDecorator(`下限占股比-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
            </div>

            <div className="ceiling-status-detail">
              <FormItem {...formItemLayout} label="上限成本价">
                {getFieldDecorator(`上限成本价-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="上限股份数量">
                {getFieldDecorator(`上限股份数量-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="上限金额">
                {getFieldDecorator(`上限金额-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="上限占股比">
                {getFieldDecorator(`上限占股比-${statusKey}`)(
                   <InputNumber />
                 )}
              </FormItem>
            </div>

          </div>
        </If>
        <If when={getFieldValue(`增减持状态-${statusKey}`) == '进展' || getFieldValue(`增减持状态-${statusKey}`) == '结束'}>

          <div className="status-detail">
            <FormItem {...formItemLayout} label="成本价">
              {getFieldDecorator(`成本价-${statusKey}`)(
                 <InputNumber />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="股份数量">
              {getFieldDecorator(`股份数量-${statusKey}`)(
                 <InputNumber />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="金额">
              {getFieldDecorator(`金额-${statusKey}`)(
                 <InputNumber />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="占股比">
              {getFieldDecorator(`占股比-${statusKey}`)(
                 <InputNumber />
               )}
            </FormItem>
          </div>

        </If>
      </div>
    )  }
})


const WrappedStatusSection = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpSatusData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpSatusData
    })

    console.log(props.submitData); debugger;

    let tmp = props.submitData;

    tmp.forEach((item, index) => {
      if(item.key == props.statusKey){
        props.submitData[index]["增减持"] = tmpSatusData;
      }
    })

    console.log(props.submitData); debugger;
  }
})(StatusSection);

export default WrappedStatusSection;
