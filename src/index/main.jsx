import React from 'react';
import Head from './common/head';
import Sidebar from './common/sidebar';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// import DevTools from '../devTools';


export default React.createClass({
  render() {
    return (
      <Layout style={{ height: '100%'}}>
        <Head />
        <Layout className="ant-layout-has-sider">
          <Sidebar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
        {/*<DevTools />*/}
      </Layout>
    )
  }
})
