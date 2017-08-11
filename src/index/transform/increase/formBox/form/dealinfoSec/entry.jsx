import React from 'react';
import { Form, InputNumber, Radio, Col, Row, Select } from 'antd';

import { connect } from 'react-redux';

import Store from '../../../../../../store';

import { updateObj } from '../../../../util/updateFieldValue';
import { fillDealToForm } from '../../../../util/fillJsonToForm';
import toThousands from '../../../../util/toThousands';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

require('./style.scss');

let tmpDealinfoData = {};

const DealInfo = React.createClass({

  componentDidMount(){
    let{ form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'increaseSubmittedDataArrived'){

        fillDealToForm({
          form: form,
          data: state.increaseForm.submitData["交易信息"]
        })

      }
    })
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="dealinfo-sec">
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="增发金额">
              {getFieldDecorator('增发金额')(
                 <InputNumber
                   formatter={value => toThousands(value)}
                 />
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="增发股价">
              {getFieldDecorator('增发股价')(
                 <InputNumber
                   formatter={value => toThousands(value)}
                 />
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="增发数量">
              {getFieldDecorator('增发数量')(
                 <InputNumber
                   formatter={value => toThousands(value)}
                 />
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="定价类型">
              {getFieldDecorator('定价类型')(
                 <Select>
                   <Option value="询价">询价</Option>
                   <Option value="定价">定价</Option>
                   <Option value="不低于">不低于</Option>
                 </Select>

               )}
            </FormItem>
          </Col>
        </Row>
      </div>
    )
  }
})

const WrappedDealInfo = Form.create({
  onFieldsChange(props, changedFields){
    /* let{name, value} = changedFields[Object.keys(changedFields)[0]];

     * tmpDealinfoData[name] = value;
     */
    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpDealinfoData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpDealinfoData
    });

    props.submitData["交易信息"] = tmpDealinfoData;
  }
})(DealInfo)

function mapStateToProps(state) {
  return {
    submitData: state.increaseForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedDealInfo)
