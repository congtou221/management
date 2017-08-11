import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message, Col, Row} from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../store';

import MainBusiness from './mainBusiness';
import BuyerBriefIntro from './buyerBriefIntro';
import BuyerinfoSection from './buyerinfoSec/entry';
import ProjectSection from './projectSec/entry';
import DealinfoSection from './dealinfoSec/entry';

import { updateObj } from '../../../util/updateFieldValue';
import { fillBasicToForm } from '../../../util/fillJsonToForm';
import { concepts } from '../../../util/datasource';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let tmpIncreaseFormData = {};

const CollectionForm = React.createClass({
  release(){
    let {
      submitData,
      dispatchUpdateLogStatus
    } = this.props;
    let {
      type,
      股票代码,
      公告日期,
      父进程公告日期
    } = submitData;

    let data = {
      type: type,
      code: 股票代码,
      date: 公告日期,
      parentdate: 父进程公告日期 || 公告日期
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


  handleCreate(e) {
    e.preventDefault();

    let {
      form,
      submitData,
      dispatchIncreaseFormCalcResult,
      dispatchUpdateLogStatus
    } = this.props;

    let me = this;

    form.validateFields((err, values) => {
      if (err) {
        message.error('数据不完善，请检查输入内容！');
        return;
      }

      submitData["type"] = "pp";

      $.ajax({
        type: 'POST',
        url: 'api/increase',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData), //values need to be processed,
        success: retData => {
          if(!retData.islogin){
            message.error('登录状态已失效，请重新登录！', 2, ()=>{
              dispatchUpdateLogStatus(false);
            });
            return;
          }

          if(!!retData.status && !!retData.data && !!retData.data.data){

            me.release();

            dispatchIncreaseFormCalcResult(retData.data.data);
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
  componentWillMount(){
    let {
      form
    } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'increaseSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.increaseForm.submitData
        })
      }
    })

  },
  autoFillInfo(e){
    let secucode = e.currentTarget.value;
    let { form, dispatchReceivedIncreaseHolders } = this.props;
    let { setFieldsValue } = form;

    $.ajax({
      type: 'GET',
      url: 'api/companyinfo',
      contentType: 'application/json; charset=UTF-8',
      data: {
        code: secucode
      },
      success: retData => {
        if(retData.status && retData.data && retData.data.data){
          let {name, holders} = retData.data.data;

          setFieldsValue({
            name: name
          });

          dispatchReceivedIncreaseHolders(holders);
        }
      }
    })
  },
  createConceptList(){
    return concepts.map(item => {
      return (<Option key={item}>{item}</Option>)
    });
  },

  render(){
    let { form, dispatchSaveMergerForm } = this.props;

    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }

    getFieldDecorator('name');

    return (
      <Form className="increase-form"
            layout="horizontal"
            onSubmit={this.handleCreate}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="股票代码" help={getFieldValue('name')}>
              {getFieldDecorator('股票代码', {
                 rules: [{
                   required: true,
                   message: '请输入股票代码！'
                 }],
              })(<Input
              onBlur={this.autoFillInfo}
                 />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="公告日期">
              {getFieldDecorator('公告日期', {
              })(<DatePicker />)}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="进程">
              {getFieldDecorator('进程', {
              })(
                 <Select
                   mode="combobox"
                   notFoundContent=""
                   defaultActiveFirstOption={false}
                   showArrow={true}
                   filterOption={false}
                   >
                   <Option key='草案'>草案</Option>
                   <Option key='修订稿'>修订稿</Option>
                   <Option key='部门批复'>部门批复</Option>
                   <Option key='证监会受理'>证监会受理</Option>
                   <Option key='通过'>通过</Option>
                   <Option key='证监会核准'>证监会核准</Option>
                   <Option key='失败'>失败</Option>
                   <Option key='上市'>上市</Option>
                   <Option key='中止'>中止</Option>

                 </Select>
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="父进程日期">
              {getFieldDecorator('父进程日期', {
              })(<DatePicker />)}
            </FormItem>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="股权变化备注">
              {getFieldDecorator('股权变化备注', {

              })(<Input />)}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="募投项目概念">
              {getFieldDecorator('募投项目概念', {

              })(<Select
                   showSearch
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {this.createConceptList()}
                 </Select>)}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={12}>
            <MainBusiness />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="是否只有标题">
              {getFieldDecorator('是否只有标题', {
              })(
                 <RadioGroup>
                   <Radio value={true}>是</Radio>
                   <Radio value={false}>否</Radio>
                 </RadioGroup>
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="本次定增事件是否热门">
              {getFieldDecorator('项目是否热门', {
              })(
                 <RadioGroup>
                   <Radio value={true}>是</Radio>
                   <Radio value={false}>否</Radio>
                 </RadioGroup>
               )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="链接">
              {getFieldDecorator('链接', {

              })(<Input />)}
            </FormItem>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="事件简述" className="desc-input">
              {getFieldDecorator('事件简述', {

              })(<Input type="textarea" style={{resize: "none"}}/>)}
            </FormItem>
          </Col>
        </Row>

        <BuyerBriefIntro />

        <DealinfoSection />
        <BuyerinfoSection />
        <ProjectSection />

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

    tmpIncreaseFormData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpIncreaseFormData
    });

    Object.assign(props.submitData, tmpIncreaseFormData);

  }
})(CollectionForm);

function mapStateToProps(state) {

  return {
    submitData: state.increaseForm.submitData
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

    /* dispatchIncreaseFormCreated: retData => {
     *   return dispatch({type: 'createIncreaseForm', retData: retData})
     * },*/
    dispatchIncreaseFormCalcResult: result => {
      return dispatch({type: 'increaseCalcResultReceived', result: result})
    },
    dispatchUpdateLogStatus: status => {
      return dispatch({type: 'updateLogStatus', status: status})
    },
    dispatchReceivedIncreaseHolders: holders => {
      return dispatch({type: 'increaseHoldersReceived', holders: holders})
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
