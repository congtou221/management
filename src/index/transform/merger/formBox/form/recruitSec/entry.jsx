import React from 'react';
import { Form, Radio, Input, Button, Icon, Select} from 'antd';
import { connect } from 'react-redux';

import BuyerList from './buyerList';
import If from '../../../../../common/if';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const RecruitSection = React.createClass({

  onRadioChange(e){
    let { dispatchShowRecruitSec } = this.props;
    dispatchShowRecruitSec(e.target.value);
  },

  addKnowBuyer(){
    let { dispatchAddKnowBuyer, buyerNumber, buyerList } = this.props;

    let newBuyerNumber = ++buyerNumber;
    let newBuyerList = buyerList;
    newBuyerList.push(newBuyerNumber);

    dispatchAddKnowBuyer( newBuyerNumber, newBuyerList );
  },

  addUnknowBuyer(){
    let { dispatchAddUnknowBuyer, buyerNumber, buyerList } = this.props;

    let newBuyerNumber = ++buyerNumber;
    let newBuyerList = buyerList;
    newBuyerList.push(newBuyerNumber);

    dispatchAddUnknowBuyer(newBuyerNumber, newBuyerList);
  },
  render(){
    let { form, showRecruitSec } = this.props;
    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 }
    }
    return (
      <div className="recruit-sec">
        <FormItem {...formItemLayout} label="是否配募">
          {getFieldDecorator('recruit', {
            initialValue: true
          })(
             <RadioGroup onChange={this.onRadioChange} >
               <Radio value={true}>是</Radio>
               <Radio value={false}>否</Radio>
             </RadioGroup>
           )}
        </FormItem>

        <If when={showRecruitSec}>
          <div className="recruit-detail">
            <FormItem  label="配募总金额">
              {getFieldDecorator('money')(
                 <Input />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="配募价格">
              {getFieldDecorator('price')(
                 <Input />
               )}
            </FormItem>
           <FormItem {...formItemLayout} label="配募数量">
              {getFieldDecorator('amount')(
                 <Input />
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="定价方式">
              {getFieldDecorator('setprice')(
                 <Input />
               )}
            </FormItem>
            <div className="recruit-buyerlist">
              <FormItem {...formItemLayout}>
                {getFieldDecorator('know-buyer')(
                   <Button type="dashed" onClick={this.addKnowBuyer}>
                     <Icon type="plus" />增加确定的配募方
                   </Button>
                 )}
              </FormItem>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('unknow-buyer')(
                   <Button type="dashed" onClick={this.addUnknowBuyer}>
                     <Icon type="plus" />增加不确定的配募方
                   </Button>
                 )}
              </FormItem>

              <BuyerList />

            </div>
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
    buyerList: state.mergerForm.recruitBuyerList
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

const WrappedRecruitSection = Form.create()(RecruitSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRecruitSection)
