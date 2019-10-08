require('dotenv').config();
const debug = require('debug')('client');
const Client = require('./services/Client');

const { DEBUG_ENABLED } = process.env;

debug.enabled = DEBUG_ENABLED;

const client = new Client();

(async () => {
  await client.connect();
  const command = process.argv.slice(3).join(' ');
  debug(command);
})();
