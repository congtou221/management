import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import NavLink from './navlink.js';
const { Sider } = Layout;

const { SubMenu, Item } = Menu;

export default React.createClass({
  render() {
    return (
      <Sider width={200} style={{ background: '#fff'}}>
        <Menu
          mode="inline"
          defaultOpenKeys={['upload']}
          defaultSelectedKeys={['1']}
          style={{ height: "100%", borderRight: "0" }} >
          <SubMenu key="upload" title={<span>上传数据</span>}>
            <Item key="1">
              <NavLink to="/upload/merger">并购</NavLink>
            </Item>
            <Item key="2">
              <NavLink to="/upload/increase">定增</NavLink>
            </Item>
            <Item key="3">
              <NavLink to="/upload/holding">增减持</NavLink>
            </Item>
            <Item key="4">
              <NavLink to="/upload/encourage">激励</NavLink>
            </Item>
          </SubMenu>
          <Item key="history">
            <NavLink to="/history">上传历史</NavLink>
          </Item>
        </Menu>
      </Sider>
    )
  }
})
