require('dotenv').config();
const WebSocket = require('rpc-websockets').Client;
const debug = require('debug')('client');

const {
  DEBUG_ENABLED, PORT, HOST,
} = process.env;

debug.enabled = DEBUG_ENABLED;
const port = PORT || 8080;
const host = HOST || 'localhost';

class Client {
  connect() {
    return new Promise((resolve) => {
      this.ws = new WebSocket(`ws://${host}:${port}`);

      this.ws.on('open', () => {
        debug('Successfully connected');
        resolve();
      });
    });
  }
}

module.exports = Client;
