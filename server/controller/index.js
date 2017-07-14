const express = require('express');
const router = express.Router();
const request = require('request');

module.exports = app => {
  app.use('/', router);
};

router.get('/', function(req, res, next){

  request({
//    url: 'https://www.joudou.com/stockinfogate/camp'
    url: 'http://localhost:3003/test'
  }, function(error, response, body){

    let obj = JSON.parse(body);
    let data = obj.status;

    res.render('index', {
      status: data
    });
  })

});
