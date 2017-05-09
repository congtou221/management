import { createStore } from 'redux';
var reducer = require('./reducer');

var store_1 = createStore(reducer);

module.exports = store_1;