const jsonServer = require('json-server');
const server = jsonServer.create();

const db = require('../../mock/db')();
const jsonRouter = jsonServer.router(db);

server.use(jsonRouter);

module.exports = server;
