import React from 'react';
import NavLink from './navlink.js';
import { Layout, Menu, Button, Row, Col } from 'antd';
const {Header} = Layout;

import LogForm from './logform';

require('./head.scss');

export default React.createClass({
  render() {
    return (
      <div>
        <Header className="header">
    <Row>
      <Col span={6}>
        <div className="logo" />
      </Col>
      <Col span={6} offset={12} style={{ textAlign: 'right' }}>
        <LogForm />
      </Col>
    </Row>



          {/* <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
              >
              <Menu.Item key="1">
              <NavLink to="/history">History</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
              <NavLink to="/upload">Upload</NavLink>
              </Menu.Item>
              </Menu> */}
        </Header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})
