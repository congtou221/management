import React from 'react';
import { Form, Input, InputNumber, Button, Icon } from 'antd';
import { connect } from 'react-redux';

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
            {getFieldDecorator(`项目名称-${key}`)(
               <Input />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="投资金额">
            {getFieldDecorator(`投资金额-${key}`)(
               <InputNumber />
             )}
          </FormItem>
          <FormItem {...formItemLayout} label="建设期">
            {getFieldDecorator(`建设期-${key}`)(
               <Input />
             )}
          </FormItem>

          <div className="profile-data">
            利润数值
            <div className="profile-data-1">
              <FormItem {...formItemLayout} label="项目总利润">
                {getFieldDecorator(`profile-${key}-sum`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="年均利润总和">
                {getFieldDecorator(`profile-${key}-average-sum`)(
                   <InputNumber />
                 )}
              </FormItem>
              <FormItem {...formItemLayout} label="年均净利润">
                {getFieldDecorator(`profile-${key}-average-net`)(
                   <InputNumber />
                 )}
              </FormItem>
            </div>

            <div className="profile-data-2">
              <FormItem {...formItemLayout} label="回收期">
                {getFieldDecorator(`project-${key}-recover`)(
                   <Input />
                 )}
              </FormItem>
            </div>
            <div className="profile-data-3">
              <FormItem {...formItemLayout} label="内部收益率">
                {getFieldDecorator(`project-${key}-inside`)(
                   <Input />
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

    let changeItem = Object.keys(changedFields)[0];

    if(changeItem === 'projectKeys'){
      let changedArr = changedFields[changeItem].value;

      let filtered = tmpProjectData.filter((value) => {
        if(!value.key){
          return false;
        }
        if(changedArr.indexOf(value.key) > -1){
          return true;
        }
        return false;

      })

      let newArr = changedArr.map((key, index) => {
        if(filtered.indexOf(key) < 0){
          return {key : key}
        }
        return tmpProjectData.find((item) => {
          return item.key == key;
        })
      })

      tmpProjectData = newArr;

    } else {

      let {name, value} = changedFields[changeItem];
      let index = name.slice(-1);
      let nameWithoutIndex = name.slice(0, -2);

      let tmpArr = tmpProjectData;

      tmpProjectData= tmpArr.map((item) => {
        if(item.key == +index){
          item[nameWithoutIndex] = value;
          return item;
        }
        return item;
      })

    }

    props.submitData["项目"] = tmpProjectData;

  }
})(ProjectSection);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedProjectSection)
