const jsonServer = require('json-server');
const server = jsonServer.create();

const db = require('../../mock/db')();
const jsonRouter = jsonServer.router(db);

server.use(jsonServer.defaults)

server.post('login', function (req, res) {
  res.sendStatus(200)
})

server.use(jsonRouter);

module.exports = server;
