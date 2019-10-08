require('dotenv').config();
const WebSocket = require('rpc-websockets').Client;
const debug = require('debug')('client');

const {
  DEBUG_ENABLED, SERVER_PORT, SERVER_HOST,
} = process.env;

debug.enabled = DEBUG_ENABLED;

class Client {
  constructor(host) {
    this.host = host || SERVER_HOST || 'localhost';
    this.port = SERVER_PORT || 8080;
  }

  connect() {
    return new Promise((resolve) => {
      this.ws = new WebSocket(`ws://${this.host}:${this.port}`);

      this.ws.on('open', () => {
        debug('Successfully connected');
        resolve();
      });
    });
  }
}

module.exports = Client;
