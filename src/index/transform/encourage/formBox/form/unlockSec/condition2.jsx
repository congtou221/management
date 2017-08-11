import React from 'react';
import moment from 'moment';
import { Form, Input, InputNumber, Button, Icon, DatePicker, Select, Col, Row } from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../../store';

import { updateObj, updateArrayLength } from '../../../../util/updateFieldValue';
import { fillBasicToForm, fillArrToForm } from '../../../../util/fillJsonToForm';
import toThousands from '../../../../util/toThousands';

require('./condition.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;

let tmpConditionData = {};
let tmpUnlockYearData = [];

let uuid = 5;
let index = 0;

const UnlockyearList = React.createClass({
  addUnlockyear(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const unlockyearKeys = getFieldValue('unlockyearKeys');

    uuid++;
    unlockyearKeys.push(uuid);

    setFieldsValue({
      unlockyearKeys: unlockyearKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const unlockyearKeys = getFieldValue('unlockyearKeys');

    setFieldsValue({
      unlockyearKeys: unlockyearKeys.filter(key => key !==k )
    });
  },

  componentDidMount(){
    let { form } = this.props;
    let { getFieldValue } = form;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'encourageSubmittedDataArrived'){
        let condition = state.encourageForm.submitData["解锁条件"] || [];
        let conditionData = condition.filter(item => {
          return item.key == 2;
        })[0];

        if(!conditionData){
          return;
        }

        fillBasicToForm({
          form: form,
          data: conditionData
        });

        fillArrToForm({
          form: form,
          data: conditionData["解锁年"]
        });
      }
      if(state.type === 'encourageBaseYearChanged'){
        let baseYear = state.encourageForm.baseYear;
        let unlockYearKeys = getFieldValue('unlockyearKeys');
        let fields = unlockYearKeys.reduce((prev, cur) => {
          prev[`年份-${cur}`] = baseYear + cur;
          return prev;
        }, {})

        form.setFieldsValue(fields);
      }
    })
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;
    let formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14  }
    }
    let headerFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    let dateFormat = "YYYY/MM";

    getFieldDecorator('unlockyearKeys', {initialValue: [1, 2, 3, 4, 5]});
    const unlockyearKeys = getFieldValue('unlockyearKeys');

    let list = unlockyearKeys.map((key, index) => {
      return (
        <div className="unlockyear-item" key={key}>

          {/* <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(key)}
              /> */}
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <FormItem
                className="unlockyear-item-formitem"
                {...formItemLayout}
                label="年份"
              >
                {getFieldDecorator(`年份-${key}`, {
                })(
                   <Input />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={8}>
              <FormItem
                className="unlockyear-item-formitem"
                {...formItemLayout}
                label="数值"
              >
                {getFieldDecorator(`数值-${key}`)(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={8}>
              <FormItem
                className="unlockyear-item-formitem"
                {...formItemLayout}
                label="增长率"
              >
                {getFieldDecorator(`增长率-${key}`)(
                   <InputNumber
                     formatter={value => toThousands(value)}
                   />
                 )}
              </FormItem>
            </Col>
          </Row>

        </div>
      )
    })

    return (
      <div className="condition-wrapper" ref="conditionItem">
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...headerFormItemLayout} label="解锁业绩类型">
              {getFieldDecorator('解锁业绩类型')(
                 <Select
                   style={{ width: 200 }}
                   >
                   <Option value="营业收入">营业收入</Option>
                   <Option value="净利润">净利润</Option>
                   <Option value="归母净利润">归母净利润</Option>
                   <Option value="归母扣非净利润">归母扣非净利润</Option>
                   <Option value="利润总额">利润总额</Option>
                   <Option value="净资产收益率">净资产收益率</Option>
                 </Select>
               )}
            </FormItem>
          </Col>
        </Row>

        <div className="unlockyear-list">
          {/* <FormItem {...formItemLayout}>
              {getFieldDecorator('add-unlockyear-btn')(
              <Button type="dashed" onClick={this.addUnlockyear}>
              <Icon type="plus" />增加解锁年
              </Button>
              )}
              </FormItem>
            */}
          <div className="unlockyear-item-wrapper">
            {list}
          </div>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state){
  return {
    submitData: state.encourageForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

const WrappedUnlockyearList = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }


    if(Object.keys(changedFields)[0] === '解锁业绩类型'){

      tmpConditionData = updateObj({
        props: props,
        changedFields: changedFields,
        tmpData: tmpConditionData
      })

    } else {

      tmpUnlockYearData = updateArrayLength({
        props: props,
        changedFields: changedFields,
        tmpData: tmpUnlockYearData
      })

    }

    tmpConditionData["解锁年"] = tmpUnlockYearData;
    tmpConditionData["key"] = 2;

    let tmpArr = props.submitData["解锁条件"];

    if(typeof tmpArr == 'undefined'){
      tmpArr = [];
    } else {
      let filtered = tmpArr.filter(value => {
        if(!!value.key && value.key !== 2){
          return true;
        }
        return false;
      })

      tmpArr = filtered;
    }

    tmpArr.push(tmpConditionData);

    props.submitData["解锁条件"] = tmpArr;

  }
})(UnlockyearList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUnlockyearList)
