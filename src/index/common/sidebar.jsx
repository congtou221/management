import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import NavLink from './navlink.js';
const { Sider } = Layout;

export default React.createClass({
  render() {
    return (
      <Sider width={200} style={{ background: '#fff'}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: "100%", borderRight: "0" }} >
          <Menu.Item key="1">
            <NavLink to="/upload/merger">并购</NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/upload/increase">定增</NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/upload/holding">增减持</NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/upload/encourage">激励</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
})
