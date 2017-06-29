const express = require('express');
const router = express.Router();
const request = require('request');

module.exports = app => {
  app.use('/', router);
};

router.get('/', function(req, res, next){

  request({
    url: 'https://beta.joudou.com/stockinfogate/camp'
  }, function(error, response, body){

    let obj = JSON.parse(body);
    let data = obj.data;

    res.render('index', {
      status: data
    });
  });

});
