import React from 'react';
import { Form, Radio, Input, InputNumber, Button, Icon, Select} from 'antd';
import { connect } from 'react-redux';

import BuyerList from './buyerList';
import If from '../../../../../common/if';

require('./style.scss');

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

let tmpRecruitData = {};

const RecruitSection = React.createClass({

  onRadioChange(e){
    let { dispatchShowRecruitSec } = this.props;
    dispatchShowRecruitSec(e.target.value);
  },

  render(){
    let { form, showRecruitSec } = this.props;
    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }

    return (
      <div className="recruit-sec">
        <FormItem {...formItemLayout} label="是否配募">
          {getFieldDecorator('是否配募', {
            initialValue: false
          })(
             <RadioGroup onChange={this.onRadioChange} >
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <If when={showRecruitSec}>
          <div className="recruit-detail">
            <FormItem {...formItemLayout} label="实际募集资金">
              {getFieldDecorator('实际募集资金')(
                 <InputNumber />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="配募股价">
              {getFieldDecorator('配募股价')(
                 <InputNumber />
               )}
            </FormItem>
           <FormItem {...formItemLayout} label="股份数">
              {getFieldDecorator('股份数')(
                 <InputNumber />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="定价方式">
              {getFieldDecorator('定价方式')(
                 <Input />
               )}
            </FormItem>
            <BuyerList />
          </div>
        </If>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    showRecruitSec: state.mergerForm.showRecruitSec,
    buyerNumber: state.mergerForm.recruitBuyerNumber,
    buyerList: state.mergerForm.recruitBuyerList,
    submitData: state.mergerForm.submitData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchShowRecruitSec: value => {
      return dispatch({
        type: 'showRecruitSec',
        showRecruitSec: value
      })
    },
    dispatchAddKnowBuyer: (number, list) => {
      return dispatch({
        type: 'addKnowBuyer',
        number: number,
        list: list
      })
    },
    dispatchAddUnknowBuyer: (number, list) => {
      return dispatch({
        type: 'addUnknowBuyer',
        number: number,
        list: list
      })
    }
  }
}

const WrappedRecruitSection = Form.create({
  onFieldsChange(props, changedFields) {

    let {name, value} = changedFields[Object.keys(changedFields)[0]];

    tmpRecruitData[name] = value;

    if(typeof props.submitData["交易信息"] == 'undefined'){
      props.submitData["交易信息"] = {};
    }
    props.submitData["交易信息"]["配募"] = tmpRecruitData;


  }

})(RecruitSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRecruitSection)
