import React from 'react';
import { Form, Input, InputNumber, Radio, DatePicker, Button, message, Select, Col, Row} from 'antd';
import { connect } from 'react-redux';

import Store from '../../../../../store';
import { fillBasicToForm } from '../../../util/fillJsonToForm';
import { updateObj } from '../../../util/updateFieldValue';
import toThousands from '../../../util/toThousands';
import { concepts } from '../../../util/datasource';

//import RecruitSection from './recruitSec/entry';
//import CompanySection from './companySec/entry';
import UnlockSection from './unlockSec/entry';

require('./style.scss');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

let tmpEncourageFormData = {};

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

  updateUnlockYear(){
    let {
      form,
      dispatchEncourageFormBaseYear
    } = this.props;

    let baseYear = form.getFieldValue('基准年');

    dispatchEncourageFormBaseYear(baseYear);

  },
  handleCreate(e) {
    e.preventDefault();

    let {
      form,
      submitData,
      dispatchEncourageFormCalcResult,
      dispatchUpdateLogStatus
    } = this.props;

    let me = this;

    form.validateFields((err, values) => {
      if (err) {
        message.error('数据不完善，请检查输入内容！');
        return;
      }

      submitData["type"] = "jl";

      let processSubmitData = submitData => {
        if(!submitData["解锁条件"]){
          return;
        }

        let filterUnlockyears = years => {
          return years.reduce((prev, cur) => {
            let tmp = prev;
            if(prev.length > 0 || cur["增长率"] || cur["数值"]){
              tmp.push(cur);
            }

            return tmp;

          }, [])
        }

        let conditions = submitData["解锁条件"].map(condition => {
          if(!condition["解锁年"]){
            return condition;
          }

          let unlockYears = condition["解锁年"];
          let noHeadYears = filterUnlockyears(unlockYears);
          let noHeadTailYears = filterUnlockyears(noHeadYears.reverse());

          Object.assign(condition, {"解锁年": noHeadTailYears.reverse()});

          return condition;
        });

        Object.assign(submitData, {"解锁条件": conditions});

      }

      processSubmitData(submitData);

      $.ajax({
        type: 'POST',
        url: 'api/encourage',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(submitData),
        success: retData => {

          if(!!retData && !retData.islogin){
            message.error('登录状态已失效，请重新登录！', 2, () => {
              dispatchUpdateLogStatus(false);
            });
            return;
          }

          if(!!retData.status && !!retData.data && !!retData.data.data){

            me.release();

            dispatchEncourageFormCalcResult(retData.data.data);
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

  componentDidMount(){
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'encourageSubmittedDataArrived'){
        fillBasicToForm({
          form: form,
          data: state.encourageForm.submitData
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
    let { form, dispatchSaveEncourageForm } = this.props;

    let { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span : 8 }
    }

    return (
      <Form className="encourage-form"
            layout="horizontal"
            onSubmit={this.handleCreate}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="股票代码">
              {getFieldDecorator('股票代码', {
                 rules: [{
                   required: true,
                   message: '请输入股票代码！'
                 }],
              })(<Input />)}
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
                   onChange={this.handleChange}
                   >
                   <Option key='草案'>草案</Option>
                   <Option key='修订稿'>修订稿</Option>
                   <Option key='完成'>完成</Option>
                   <Option key='终止'>终止</Option>
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
            <FormItem {...formItemLayout} label="链接">
              {getFieldDecorator('链接', {

              })(<Input />)}
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
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="基准年">
              {getFieldDecorator('基准年', {
              })(
                 <InputNumber
                   onBlur={this.updateUnlockYear}
                 />
               )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="price-wrapper">
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <FormItem {...formItemLayout} label="激励股价">
                    {getFieldDecorator('激励股价', {

                    })(<InputNumber
                         formatter={value => toThousands(value)}
                    />)}
                  </FormItem>
                </Col>
                <Col className="gutter-row" span={12}>
                  <FormItem {...formItemLayout} label="激励股份数量">
                    {getFieldDecorator('激励股份数量', {

                    })(<InputNumber
                         formatter={value => toThousands(value)}
                    />)}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="激励类型">
              {getFieldDecorator('激励类型', {
              })(
                 <RadioGroup>
                   <Radio value="限制性股票激励">限制性股票激励</Radio>
                   <Radio value="股票期权激励">股票期权激励</Radio>
                 </RadioGroup>
               )}
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

        <UnlockSection />

        <FormItem style={{textAlign: 'center'}}>
          <Button className="submit-btn" type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    )
  }

})

const WrappedCollectionForm = Form.create({
  onFieldsChange(props, changedFields){
    let {dispatchEncourageSubmitBtnClicked} = props;

    if($.isEmptyObject(changedFields)){
      return;
    }

    tmpEncourageFormData = updateObj({
      props: props,
      changedFields: changedFields,
      tmpData: tmpEncourageFormData
    });

    //Object.assign(props.submitData, tmpEncourageFormData);
    tmpEncourageFormData["解锁条件关系"] = props.submitData["解锁条件关系"];
    tmpEncourageFormData["解锁条件"] = props.submitData["解锁条件"];

    dispatchEncourageSubmitBtnClicked(tmpEncourageFormData);

  }
})(CollectionForm);

 function mapStateToProps(state) {

   return {
     submitData: state.encourageForm.submitData
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
     dispatchEncourageSubmitBtnClicked: data => {
       return dispatch({type: 'encourageSubmitBtnClicked', data: data})
     },
     dispatchEncourageFormCreated: retData => {
       return dispatch({type: 'createEncourageForm', retData: retData})
     },
     dispatchEncourageFormCalcResult: result => {
       return dispatch({
         type: 'encourageCalcResultReceived',
         result: result
       })
     },
     dispatchEncourageFormBaseYear: baseYear => {
       return dispatch({
         type: 'encourageBaseYearChanged',
         baseyear: baseYear
       })
     },
     dispatchUpdateLogStatus: status => {
       return dispatch({type: 'updateLogStatus', status: status})
     }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCollectionForm)
