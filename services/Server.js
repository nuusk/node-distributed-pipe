require('dotenv').config();
const WebSocketServer = require('rpc-websockets').Server;
const debug = require('debug')('server');

const {
  DEBUG_ENABLED, PORT, HOST,
} = process.env;

debug.enabled = DEBUG_ENABLED;

const port = PORT || 8080;
const host = HOST || 'localhost';

class Server {
  listen() {
    this.ws = new WebSocketServer({ port, host });
    debug(`Server started on ${host}:${port}`);

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
