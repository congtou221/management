
const express = require('express');
const router = express.Router();
const path = require('path');
const proxy = require('express-http-proxy');
const jsonServer = require('./mock/jsonServer');
const webpackDevServer = require('../webpackDevServer');
// var glob = require('glob');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var useragent = require('express-useragent');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'view'));
// app.set('view engine', 'ejs');

// if (process.env.NODE_ENV == 'local') {
//     app.use(express.static(path.join(__dirname, '../dist')));
// }
// else {
//     app.use(express.static('/home/works/apps/joudou/newDev/dist'));
// }
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(useragent.express());

// var controllers = glob.sync(path.join(__dirname, './controller/*.js'));

// controllers.forEach(function(controller) {
//     require(controller)(app);
// });
if(process.env.NODE_ENV == 'local') {
  
  webpackDevServer.listen(8080, () => {
    console.log('webpackDevServer is running, HMR is started');
  });
  jsonServer.listen(3004, () => {
    console.log('JSON Server is running');
  });
}
// mock数据  开发环境下代理到jsonServer，生产环境代理到线上服务器
if(process.env.NODE_ENV == 'local') {
  app.use('/api', proxy('http://localhost:3004'));
} else {
  app.use('/api', proxy('https://test.joudou.com'));
}
// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
// 静态资源路径
app.use(express.static(path.join(__dirname, '../build')));


app.use('/', router);
router.get('/', function(req, res, next){
  res.render('index');
});


module.exports = app;
