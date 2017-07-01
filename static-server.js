const static = require('node-static');
const http = require('http');

const port = 8080;

const staticServer = new static.Server('.', {
  cache: 60
});
const server = http.createServer((req, res) => {
  staticServer.serve(req, res);
}).listen(port);
