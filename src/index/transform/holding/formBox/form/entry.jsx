import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import { Modal, Form, Input,InputNumber, Radio, DatePicker, Select, Button, Icon, message, Row, Col} from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../store';
import If from '../../../../common/if';

import { updateArray } from '../../../util/updateFieldValue';
import { fillBasicToForm, fillVariableArrToForm } from '../../../util/fillJsonToForm';
import toThousands from '../../../util/toThousands';
import { concepts } from '../../../util/datasource';

//import StatusSection from './statusSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let uuid = 1;
let tmpHoldingData = [{key: 1}];

const CollectionForm = React.createClass({
  release(){
    let {
      submitData,
      dispatchUpdateLogStatus
    } = this.props;
    let {
      type,
      股票代码,
      记录
    } = submitData;

    let first = 记录[0] || [];
    let 父进程日期 = first["父进程日期"] || first["公告日期"];
    let 公告日期 = 记录.reduce((prev, cur) => {
      prev = prev + cur["公告日期"] + " ";
      return prev;
    }, "");

    let data = {
      type: type,
      code: 股票代码,
      date: 公告日期,
      parentdate: 父进程日期
    };

    $.ajax({
      type: 'POST',
      url: 'api/release',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: retData => {
        if(!!retData && !retData.islogin){
          message.error('登录状态已失效，请重新登录！', 2, () => {
            //            window.location.reload();
            dispatchUpdateLogStatus(false);
          });
          return;
        }
        if(!!retData && !retData.status){
          message.error('发布失败，未找到上一条相同记录！');
          return;
        }

        message.success('发布成功！');

      }
    })
  },
  dealDataFormat(data){
    let { form } = this.props;
    let { getFieldValue } = form;

    let records = data["记录"] || [];

    if(!Array.isArray(records)){
      return [];
    }
    return records.map(item => {
      if(Object.prototype.toString.call(item) === "[object Object]"){
        item["父进程日期"] = getFieldValue('父进程日期').format('YYYY/MM/DD');
        item["类型"] = getFieldValue('类型');
        item["概念"] = getFieldValue('概念');
        return item;
      }
    })
  },
  handleCreate(e) {
    e.preventDefault();

    let {
      form,
      submitData,
      dispatchHoldingFormCalcResult,
      dispatchUpdateLogStatus
    } = this.props;
    let me = this;

    form.validateFields((err, values) => {
      if (err) {
        message.error('数据不完善，请检查输入内容！');
        return;
      }

      submitData["type"] = "internal";

      submitData["记录"] = me.dealDataFormat(submitData);

      console.log(submitData); debugger;
      /* create successfully*/
      $.ajax({
        type: 'POST',
        url: 'api/holding',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({submit: submitData}),

        success: retData => {
          if(!!retData && !retData.islogin){
            message.error('登录状态已失效，请重新登录！', 2, () => {
              dispatchUpdateLogStatus(false);
            });
            return;
          }
          if(!!retData.status && !!retData.data && !!retData.data.data){

            me.release();

            dispatchHoldingFormCalcResult(retData.data.data);
            message.success('提交成功！');

            return;
          }
          message.error('提交失败');
        },
        error: err => {
          message.error('网络错误，请稍后重试！');
        }
      })
    });
  },

  addForm(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const formKeys = getFieldValue('formKeys');

    uuid++;
    formKeys.push(uuid);

    setFieldsValue({
      formKeys: formKeys
    })

  },
  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const formKeys = getFieldValue('formKeys');

    setFieldsValue({
      formKeys: formKeys.filter(key => key !== k)
    });
  },
  componentDidMount(){
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'holdingSubmittedDataArrived'){
        form.setFieldsValue({
          "股票代码": state.holdingForm.submitData["股票代码"]
        })

        let records = state.holdingForm.submitData["记录"];
        if(!!records && records.length > 0){
          form.setFieldsValue({
            "父进程日期": moment(records[0]["父进程日期"]),
            "类型": records[0]["类型"],
            "概念": records[0]["概念"]
          })
        }

        fillVariableArrToForm({
          form: form,
          data: state.holdingForm.submitData["记录"],
          keyname: 'formKeys'
        })
      }
    })
  },
  createConceptList(){
    return concepts.map(item => {
      return (<Option key={item}>{item}</Option>)
    });
  },

  render(){
    let { form, submitData } = this.props;

    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }

    getFieldDecorator('formKeys', {initialValue: [1]});
    const formKeys = getFieldValue('formKeys');

    let me = this;

    let list = formKeys.map((key, index) => {
      return (
        <div className="form-item" key={key} data-key={key}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="公告日期">
                {getFieldDecorator(`公告日期-${key}`, {
                })(<DatePicker />)}
              </FormItem>
            </Col>

            {/* <FormItem {...formItemLayout} label="进程">
                {getFieldDecorator(`进程-${key}`, {
                })(
                <Select
                mode="combobox"
                notFoundContent=""
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onChange={this.handleChange}
                >
                <Option key='预案'>预案</Option>
                <Option key='草案'>草案</Option>
                <Option key='修订'>修订</Option>
                <Option key='审批'>审批</Option>
                <Option key='核准'>核准</Option>
                <Option key='终止'>终止</Option>
                <Option key='交割'>交割</Option>

                </Select>
                )}
                </FormItem>
              */}
            {/* <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout} label="事件简述">
                {getFieldDecorator(`事件简述-${key}`, {

                })(<Input />)}
                </FormItem>
                </Col>
              */}

            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="开始日期">
                {getFieldDecorator(`开始日期-${key}`, {
                })(<DatePicker />)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem {...formItemLayout} label="截止日期">
                {getFieldDecorator(`截止日期-${key}`, {
                })(<DatePicker />)}
              </FormItem>
            </Col>
          </Row>
          <div className="status-sec" ref="formItem">
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <FormItem {...formItemLayout}  label="进程" >
                  {getFieldDecorator(`进程-${key}`, {
                     initialValue: '计划'
                  })(
                     <RadioGroup>
                       <Radio value="计划">计划</Radio>
                       <Radio value="进展">进展</Radio>
                       <Radio value="结束">结束</Radio>
                     </RadioGroup>
                   )}
                </FormItem>
              </Col>
            </Row>

            <If when={getFieldValue(`进程-${key}`) == '计划'}>
              <div className="status-detail">

                <div className="floor-status-detail">
                  <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="下限成本">
                        {getFieldDecorator(`下限成本-${key}`)(
                          <InputNumber
                            formatter={value => toThousands(value)}
                          />
                         )}
                      </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="下限数量">
                        {getFieldDecorator(`下限数量-${key}`)(
                          <InputNumber
                            formatter={value => toThousands(value)}
                          />
                         )}
                      </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="下限金额">
                        {getFieldDecorator(`下限金额-${key}`)(
                          <InputNumber
                            formatter={value => toThousands(value)}
                          />
                         )}
                      </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="下限占股比">
                        {getFieldDecorator(`下限占股比-${key}`)(
                          <InputNumber
                            formatter={value => toThousands(value)}
                          />
                         )}
                      </FormItem>
                    </Col>
                  </Row>
                </div>

                <div className="ceiling-status-detail">
                  <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="上限成本">
                        {getFieldDecorator(`上限成本-${key}`)(
                          <InputNumber
                            formatter={value => toThousands(value)}
                          />
                         )}
                      </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="上限数量">
                        {getFieldDecorator(`上限数量-${key}`)(
                           <InputNumber
                             formatter={value => toThousands(value)}
                           />
                         )}
                      </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="上限金额">
                        {getFieldDecorator(`上限金额-${key}`)(
                           <InputNumber
                             formatter={value => toThousands(value)}
                           />
                         )}
                      </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <FormItem {...formItemLayout} label="上限占股比">
                        {getFieldDecorator(`上限占股比-${key}`)(
                           <InputNumber
                             formatter={value => toThousands(value)}
                           />
                         )}
                      </FormItem>
                    </Col>
                  </Row>
                </div>

              </div>
            </If>
            <If when={getFieldValue(`进程-${key}`) == '进展' || getFieldValue(`进程-${key}`) == '结束'}>

              <div className="status-detail">
                <Row gutter={16}>
                  <Col className="gutter-row" span={6}>
                    <FormItem {...formItemLayout} label="成本">
                      {getFieldDecorator(`成本-${key}`)(
                         <InputNumber
                           formatter={value => toThousands(value)}
                         />
                       )}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <FormItem {...formItemLayout} label="数量">
                      {getFieldDecorator(`数量-${key}`)(
                         <InputNumber
                           formatter={value => toThousands(value)}
                         />
                       )}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <FormItem {...formItemLayout} label="金额">
                      {getFieldDecorator(`金额-${key}`)(
                         <InputNumber
                           formatter={value => toThousands(value)}
                         />
                       )}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <FormItem {...formItemLayout} label="占股比">
                      {getFieldDecorator(`占股比-${key}`)(
                         <InputNumber
                           formatter={value => toThousands(value)}
                         />
                       )}
                    </FormItem>
                  </Col>
                </Row>
              </div>

            </If>
          </div>

        </div>
      )
    })

    return (
      <Form className="holding-form"
            layout="horizontal"
            onSubmit={this.handleCreate}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="股票代码" >
              {getFieldDecorator('股票代码', {
                 rules: [{
                   required: true,
                   message: '请输入股票代码！'
                 }],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="父进程日期">
              {getFieldDecorator('父进程日期', {
              })(<DatePicker />)}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator('类型', {

              })(
                 <Select>
                   <Option value="大股东增持">大股东增持</Option>
                   <Option value="大股东减持">大股东减持</Option>
                   <Option value="高管坚持">高管增持</Option>
                   <Option value="高管减持">高管减持</Option>
                   <Option value="员工持股计划">员工持股计划</Option>
                   <Option value="回购">回购</Option>
                 </Select>
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="概念">
              {getFieldDecorator('概念', {

              })(<Select
                   showSearch
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {this.createConceptList()}
                 </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="子进程">
              {getFieldDecorator('add-form')(
                 <Button type="dashed" onClick={this.addForm}>
                   <Icon type="plus" /> 增加
                 </Button>
               )}
            </FormItem>
          </Col>
        </Row>
        {list}

        <FormItem style={{textAlign: 'center'}}>
          <Button className="submit-btn" type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    )
  }

})

const WrappedCollectionForm = Form.create({
  onFieldsChange(props, changedFields){
    if($.isEmptyObject(changedFields)){
      return;
    }
    if(Object.keys(changedFields)[0] == "股票代码"){
      props.submitData["股票代码"] = changedFields["股票代码"].value;
      return;
    }

    tmpHoldingData = updateArray({
      props: props,
      changedFields: changedFields,
      addKey: 'formKeys',
      tmpData: tmpHoldingData
    })


    tmpHoldingData.forEach((item, index) => {
      props.submitData["记录"][index] = item;
    });

  }
})(CollectionForm);

 function mapStateToProps(state) {

   return {
     submitData : state.holdingForm.submitData
   }
 }

function mapDispatchToProps(dispatch) {
   return {
     /* dispatchSaveMergerForm: form => {
      *   return dispatch({
      *     type: 'saveMergerForm',
      *     form: form
      *   })
      * }*/
     /* dispatchHoldingFormCreated: retData => {
      *   return dispatch({type: 'createHoldingForm', retData: retData})
      * }*/
     dispatchHoldingFormCalcResult: result => {
       return dispatch({type: 'holdingCalcResultReceived', result: result})
     },
     dispatchUpdateLogStatus: status => {
       return dispatch({type: 'updateLogStatus', status: status});
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
