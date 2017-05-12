const jsonServer = require('json-server');
const server = jsonServer.create();
const middleWares = jsonServer.defaults();
const bodyParser = require('body-parser');

const db = require('../../mock/db')();
const jsonRouter = jsonServer.router(db);

server.use(middleWares);
server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {

  if (req.method === 'POST') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET';
    req.query = req.body;
  }
  // Continue to JSON Server router
  next()
})

server.use(jsonRouter);

module.exports = server;
