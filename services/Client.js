require('dotenv').config();
const WebSocket = require('rpc-websockets').Client;
const debug = require('debug')('client');

const {
  DEBUG_ENABLED, SERVER_PORT, SERVER_HOST,
} = process.env;

debug.enabled = DEBUG_ENABLED;

class Client {
  connect(host) {
    return new Promise((resolve) => {
      this.ws = new WebSocket(`ws://${host || SERVER_HOST || 'localhost'}:${SERVER_PORT || 8080}`);

      this.ws.on('open', () => {
        debug('Successfully connected');
        resolve();
      });
    });
  }

  pipe(command, stream) {
    return new Promise((resolve) => {
      this.ws.call('pipe', { command, stream }).then((data) => {
        debug(data);
        resolve(data);
      });
    });
  }

  disconnect() {
    process.exit();
  }
}

module.exports = Client;
