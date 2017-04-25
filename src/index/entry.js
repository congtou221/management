import React from 'react';
import NavLink from './common/navlink.js';

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><NavLink to="/transform">Transform</NavLink></li>
          <li><NavLink to="/compare">Compare</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
