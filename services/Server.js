require('dotenv').config();
const WebSocketServer = require('rpc-websockets').Server;
const debug = require('debug')('server');

const {
  DEBUG_ENABLED, SERVER_PORT, SERVER_HOST,
} = process.env;

debug.enabled = DEBUG_ENABLED;

class Server {
  constructor(host) {
    this.host = host || SERVER_HOST || 'localhost';
    this.port = SERVER_PORT || 8080;
  }

  listen() {
    this.ws = new WebSocketServer({ port: this.port, host: this.host });
    debug(`Server started on ${this.host}:${this.port}`);

    this.initListeners();
  }

  initListeners() {
    this.ws.on('connection', () => {
      debug('client connected');
    });

    this.ws.on('error', (err) => {
      debug(err);
    });
  }
}

module.exports = Server;
