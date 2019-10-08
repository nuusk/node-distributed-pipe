require('dotenv').config();
const WebSocket = require('rpc-websockets').Client;
const debug = require('debug')('client');

const {
  DEBUG_ENABLED, SERVER_PORT, SERVER_HOST,
} = process.env;

debug.enabled = DEBUG_ENABLED;

class Client {
  constructor() {
    this.inputStream = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      this.inputStream += chunk;
    });
    process.stdin.on('end', () => {
      // send to server
    });
  }

  connect(host) {
    return new Promise((resolve) => {
      this.ws = new WebSocket(`ws://${host || SERVER_HOST || 'localhost'}:${SERVER_PORT || 8080}`);

      this.ws.on('open', () => {
        debug('Successfully connected');
        resolve();
      });
    });
  }
}

module.exports = Client;
