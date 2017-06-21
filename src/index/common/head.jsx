import React from 'react';
import NavLink from './navlink.js';
import { Layout, Menu } from 'antd';
const {Header} = Layout;

export default React.createClass({
  render() {
    return (
      <div>
        <Header className="header">
          <div className="logo" />
          <Menu
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
          </Menu>
        </Header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})
