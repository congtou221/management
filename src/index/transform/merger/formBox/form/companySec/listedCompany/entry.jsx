import React from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { connect } from 'react-redux';
import toThousands from '../../../../../util/toThousands';

const FormItem = Form.Item;

let companyId;

const ListedCompany = React.createClass({

  componentDidMount(){
    companyId = $(this.refs.listCompanyItem.parentNode).data("key");
  },
  render(){
    let { form } = this.props;
    let { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8}
    }

    return (
      <div className="listed-company" ref="listCompanyItem">

        <label>上市公司</label>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="股票代码">
              { getFieldDecorator('股票代码', {

              })(
                  <Input />
                )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="换股价">
              { getFieldDecorator('换股价', {

              })(
                  <InputNumber
                    formatter={value => toThousands(value)}
                  />
                )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="换股比例">
              { getFieldDecorator('换股比例', {

              })(
                  <InputNumber
                    formatter={value => toThousands(value)}
                  />
                )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="收购价格">
              { getFieldDecorator('收购价格', {

              })(
                  <InputNumber
                    formatter={value => toThousands(value)}
                  />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="收购比例">
              { getFieldDecorator('收购比例', {

              })(
                  <InputNumber
                    formatter={value => toThousands(value)}
                  />
                )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="收购金额">
              { getFieldDecorator('收购金额', {

              })(
                  <InputNumber
                    formatter={value => toThousands(value)}
                  />
                )}
            </FormItem>
          </Col>
          <Col className="gutter-row" span={6}>
            <FormItem {...formItemLayout} label="收购现金">
              { getFieldDecorator('收购现金', {

              })(
                  <InputNumber
                     formatter={value => toThousands(value)}
                  />
                )}
            </FormItem>
          </Col>
        </Row>

      </div>
    )
  }
})

const WrappedListedCompany = Form.create({
  onFieldsChange(props, changedFields){

    if(typeof props.submitData["被收购公司"] == "undefined"){
      props.submitData["被收购公司"] = [];
    }

    let changeItem = Object.keys(changedFields)[0];

    let {name, value} = changedFields[changeItem];

    let tmpCompanyData = props.submitData["被收购公司"].map(item => {
      if(item.key == companyId){
        item[name] = value;
        return item;
      }
      return item;
    })

    props.submitData["被收购公司"] = tmpCompanyData;

  }
})(ListedCompany)

function mapStateToProps(state) {
  return {
    submitData: state.mergerForm.submitData
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedListedCompany)
