import React from 'react';
import { render } from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import store from './store';
// 首页
import Index from './index/main';
// 上传页面
import Transform from './index/transform/entry';
import Merger from './index/transform/merger/entry';
import Increase from './index/transform/increase/entry';
import Holding from './index/transform/holding/entry';
import Encourage from './index/transform/encourage/entry';
// 上传历史页面
import Compare from './index/compare/entry';

const router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index}>
        <Route path="/upload/merger" component={Merger}/>
        <Route path="/upload/increase" component={Increase} />
        <Route path="/upload/holding" component={Holding} />
        <Route path="/upload/encourage" component={Encourage} />
        <Route path="/history" component={Compare} />
      </Route>
    </Router>
  </Provider>
);
exports.start = () => {
  render(router, document.getElementById('app'));
};
