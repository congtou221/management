import React from 'react';
import { Form, Radio, Input, InputNumber, Button, Icon, Select, Row, Col} from 'antd';
import { connect } from 'react-redux';
import { updateObj } from '../../../../util/updateFieldValue';

import BuyerList from './buyerList';
import If from '../../../../../common/if';
import Store from '../../../../../../store';

import { fillBasicToForm } from '../../../../util/fillJsonToForm';
import toThousands from '../../../../util/toThousands';

require('./style.scss');

const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

let tmpRecruitData = {};

const RecruitSection = React.createClass({

  onRadioChange(e){
    let { dispatchShowRecruitSec } = this.props;
    dispatchShowRecruitSec(e.target.value);
  },

  componentDidMount(){
    let {
      form
    } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'mergerSubmittedDataArrived'){
        let dealinfo = state.mergerForm.submitData["交易信息"] || {};
        let recruit = dealinfo["配募"] || {};
        fillBasicToForm({
          form: form,
          data: recruit
        })
      }
    })
  },
  formatNumber(rule, value, callback){
    if(!value){
      return;
    }
    callback(toThousands(value));
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
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="是否配募">
              {getFieldDecorator('是否配募', {
                 initialValue: true
              })(
                 <RadioGroup onChange={this.onRadioChange} >
                   <Radio value={true}>是</Radio>
                   <Radio value={false}>否</Radio>
                 </RadioGroup>
               )}
            </FormItem>
          </Col>
        </Row>
        <If when={showRecruitSec}>
          <div className="recruit-detail">
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="实际募集资金">
                  {getFieldDecorator('实际募集资金', {
                  })(
                     <InputNumber
                       formatter={value => toThousands(value)}
                     />
                   )}
                </FormItem>
              </Col>

              <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="配募股价">
                  {getFieldDecorator('配募股价', {
                  })(
                     <InputNumber
                       formatter={value => toThousands(value)}
                     />
                   )}
                </FormItem>
              </Col>

              <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="股份数">
                  {getFieldDecorator('股份数')(
                     <InputNumber
                       formatter={value => toThousands(value)}
                     />
                   )}
                </FormItem>
              </Col>

              <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="定价方式">
                  {getFieldDecorator('定价方式')(
                     <Select>
                       <Option value="询价">询价</Option>
                       <Option value="定价">定价</Option>
                       <Option value="不低于">不低于</Option>
                     </Select>
                   )}
                </FormItem>
              </Col>
            </Row>
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

    tmpRecruitData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpRecruitData
    })


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
