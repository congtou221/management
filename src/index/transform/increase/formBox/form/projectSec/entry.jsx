import React from 'react';
import { Form, Input, InputNumber, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import Store from '../../../../../../store';
import { updateArray } from '../../../../util/updateFieldValue';
import { fillVariableArrToForm } from '../../../../util/fillJsonToForm';

require('./style.scss');

const FormItem = Form.Item;

let uuid = 0;
let tmpProjectData = [];

const ProjectSection = React.createClass({
  addProject(){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const projectKeys = getFieldValue('projectKeys');

    uuid++;
    projectKeys.push(uuid);

    setFieldsValue({
      projectKeys: projectKeys
    })
  },

  remove(k){
    const { form } = this.props;
    const { getFieldValue, setFieldsValue } = form;

    const projectKeys = getFieldValue('projectKeys');

    setFieldsValue({
      projectKeys: projectKeys.filter(key => key !==k )
    });
  },

  componentDidMount(){
    let { form } = this.props;

    Store.subscribe(() => {
      let state = Store.getState();

      if(state.type === 'increaseSubmittedDataArrived'){
        fillVariableArrToForm({
          form: form,
          data: state.increaseForm.submitData["募投项目"],
          keyname: 'projectKeys'
        })
      }
    })
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;
    let formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 }
    }

    getFieldDecorator('projectKeys', {initialValue: []});
    const projectKeys = getFieldValue('projectKeys');

    let list = projectKeys.map((key, index) => {
      return (
        <div className="project-item" key={key}>
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />
          <FormItem {...formItemLayout} label="项目名称">
            {getFieldDecorator(`名称-${key}`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="募投金额">
            {getFieldDecorator(`募投金额-${key}`)(
               <InputNumber />
             )}
          </FormItem>

          <div className="profile-data">
            利润数值
            <div className="profile-data-1">
              <FormItem {...formItemLayout} label="项目总利润">
                {getFieldDecorator(`项目总利润-${key}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="年均利润总额">
                {getFieldDecorator(`年均利润总额-${key}`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="年均净利润">
                {getFieldDecorator(`年均净利润-${key}`)(
                   <InputNumber />
                 )}
              </FormItem>
            </div>

            <div className="profile-data-2">
              <FormItem {...formItemLayout} label="建设期">
                {getFieldDecorator(`建设期-${key}`)(
                   <InputNumber />
                 )}
              </FormItem>

              <FormItem {...formItemLayout} label="回收期">
                {getFieldDecorator(`回收期-${key}`)(
                   <InputNumber />
                 )}
              </FormItem>
            </div>
            <div className="profile-data-3">
              <FormItem {...formItemLayout} label="内部收益率">
                {getFieldDecorator(`内部收益率-${key}`)(
                   <InputNumber />
                 )}
              </FormItem>
            </div>

          </div>

        </div>
      )
    })

    return (
      <div className="project-sec">
        <div className="project-list">

          <FormItem {...formItemLayout}>
            {getFieldDecorator('addProjectBtn')(
               <Button type="dashed" onClick={this.addProject}>
                 <Icon type="plus" />增加项目
               </Button>
             )}
          </FormItem>

          {list}
        </div>

      </div>

    )
  }
})

function mapStateToProps(state){
  return {
    submitData: state.increaseForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

const WrappedProjectSection = Form.create({
  onFieldsChange(props, changedFields) {
    if($.isEmptyObject(changedFields)){
      return;
    }


    tmpProjectData = updateArray({
      props: props,
      changedFields: changedFields,
      addKey: 'projectKeys',
      tmpData: tmpProjectData
    })
    props.submitData["募投项目"] = tmpProjectData;

  }
})(ProjectSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedProjectSection)
