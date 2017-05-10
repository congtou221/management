import React from 'react';
import { render } from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import store from './store';

import Index from './index/main';
import Transform from './index/transform/entry';
import Compare from './index/compare/entry';

const router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Index}>
        <Route path="/transform" component={Transform} />
        <Route path="/compare" component={Compare} />
      </Route>
    </Router>
  </Provider>
);
exports.start = () => {
  render(router, document.getElementById('app'));
};
