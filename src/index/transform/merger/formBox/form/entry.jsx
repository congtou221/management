import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Select, Button, message, Icon, Row, Col} from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../store';
import { fillBasicToForm } from '../../../util/fillJsonToForm';
import { updateObj } from '../../../util/updateFieldValue';
import { concepts } from '../../../util/datasource';

import BuyerBriefIntro from './buyerBriefIntro';
import RecruitSection from './recruitSec/entry';
import CompanySection from './companySec/entry';
import DealinfoSection from './dealinfoSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let tmpMergerFormData = {};

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
      /* dispatchMergerFormSubmited,*/
      dispatchMergerFormCalcResult,
      dispatchUpdateLogStatus
    } = this.props;

    let me = this;

    form.validateFields((err, values) => {
      if (err) {
        message.error('数据不完善，请检查输入内容！');
        return;
      }
      submitData["type"] = "merge";

      /* 提交代码的时候记得重置submitData的值*/

      let newData = Object.assign(values, submitData);
      /* 将本组件内的数据，用来进行post请求；
       * 与此同时，更新store里的mergerForm.submitData*/
      /* dispatchMergerFormSubmitBtnClicked();*/

      /* create successfully*/
      $.ajax({
        type: 'POST',
        url: 'api/test2',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData),
        success: retData => {
          if(!retData.islogin){
            message.error('登录状态已失效，请重新登录！', 2, () => {
              dispatchUpdateLogStatus(false);
            });
            return;
          }
          /* dispatchMergerFormSubmited();*/

          if(!!retData.status && !!retData.data && !!retData.data.data){

            me.release();

            dispatchMergerFormCalcResult(retData.data.data);
            message.success('提交成功！');

            return;
          }
          message.error('提交失败！');
        }
      })
    });
  },

  componentDidMount(){
    let {
      form
    } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();
      if(state.type === 'mergerSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.mergerForm.submitData
        })
      }
    });
  },
  autoFillInfo(e){
    let secucode = e.currentTarget.value;
    let { form, dispatchReceivedMergerHolders } = this.props;
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

          dispatchReceivedMergerHolders(holders);
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
      labelCol: { span: 15 },
      wrapperCol: { span : 15 }
    }

    getFieldDecorator('name');

    return (
      <Form className="merger-form"
            layout="horizontal"
            onSubmit={this.handleCreate}>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem label="股票代码" help={getFieldValue('name')}>
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
            <FormItem label="公告日期">
              {getFieldDecorator('公告日期', {
              })(<DatePicker />)}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={6}>
            <FormItem label="进程">
              {getFieldDecorator('进程', {
              })(
                 <Select
                   mode="combobox"
                   notFoundContent=""
                   defaultActiveFirstOption={false}
                   showArrow={true}
                   filterOption={false}
                   >
                   <Option key="草案">草案</Option>
                   <Option key="修订稿">修订稿</Option>
                   <Option key="部门批复">部门批复</Option>
                   <Option key="证监会受理">证监会受理</Option>
                   <Option key="通过">通过</Option>
                   <Option key="证监会核准">证监会核准</Option>
                   <Option key="失败">失败</Option>
                   <Option key="上市">上市</Option>
                   <Option key="中止">中止</Option>

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
            <FormItem {...formItemLayout} label="被收购方概念">
              {getFieldDecorator('被收购方概念', {

              })(<Select
                   showSearch
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {this.createConceptList()}
                 </Select>)}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="被收购方行业">
              {getFieldDecorator('被收购方行业', {

              })(<Input />)}
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
            <FormItem {...formItemLayout} label="是否只录标题">
              {getFieldDecorator('是否只录标题', {

              })(
                 <RadioGroup>
                   <Radio value={true}>是</Radio>
                   <Radio value={false}>否</Radio>
                 </RadioGroup>
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="收购方概念是否热门">
              {getFieldDecorator('收购方概念是否热门', {
              })(
                 <RadioGroup>
                   <Radio value={true}>是</Radio>
                   <Radio value={false}>否</Radio>
                 </RadioGroup>
               )}
            </FormItem>
          </Col>

          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="被收购方概念是否热门">
              {getFieldDecorator('被收购方概念是否热门', {
              })(
                 <RadioGroup>
                   <Radio value={true}>是</Radio>
                   <Radio value={false}>否</Radio>
                 </RadioGroup>
               )}
            </FormItem>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem label="事件描述" className="desc-input">
              {getFieldDecorator('事件描述', {

              })(<Input type="textarea" style={{resize:"none"}} />)}
            </FormItem>
          </Col>


        </Row>
        <BuyerBriefIntro />

        <DealinfoSection />
        <RecruitSection />
        <CompanySection />

        <FormItem style={{textAlign: 'center'}}>
          <Button className="submit-btn" type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>

      </Form>
    )
  }

})

const WrappedCollectionForm = Form.create({
  onFieldsChange(props, changedFields){
    let {dispatchMergerBasicdataChanged} = props;

    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpMergerFormData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpMergerFormData
    });

    let allMergerFormData = Object.keys(props.submitData).reduce((prev, cur) => {
      prev[cur] = props.submitData[cur];
      return prev;
    }, tmpMergerFormData);

    dispatchMergerBasicdataChanged(allMergerFormData);
    /* console.log(props.submitData, tmpMergerFormData); debugger;
     * Object.assign(props.submitData, tmpMergerFormData);
     * console.log(props.submitData, tmpMergerFormData); debugger;
     */
  }
})(CollectionForm);

 function mapStateToProps(state) {

   return {
     submitData: state.mergerForm.submitData
   }
 }

function mapDispatchToProps(dispatch) {
   return {
     dispatchMergerBasicdataChanged: data => {
       return dispatch({type: 'mergerBasicdataChanged', data: data})
     },
     dispatchMergerFormCalcResult: result => {
       return dispatch({type: 'mergerCalcResultReceived', result: result})
     },
     dispatchUpdateLogStatus: status => {
       return dispatch({type: 'updateLogStatus', status: status})
     },
     dispatchReceivedMergerHolders: holders => {
       return dispatch({type: 'mergerHoldersReceived', holders: holders})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
