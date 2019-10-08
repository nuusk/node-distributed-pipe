#!/usr/bin/env node
/*
 usage ./client.js <server_host> <command [...args]>
*/
require('dotenv').config();
const debug = require('debug')('client');
const Client = require('./services/Client');

const { DEBUG_ENABLED } = process.env;

debug.enabled = DEBUG_ENABLED;

const client = new Client();
let inputStream = '';

(async () => {
  const serverHost = process.argv.slice(2, 3).join(' ');
  const command = process.argv.slice(3).join(' ');
  if (process.argv.length < 4) {
    debug('ERROR: usage \n$ ./client.js <server_host> <command [...args]>');
    process.exit();
  }

  await client.connect(serverHost);

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    inputStream += chunk;
  });
  process.stdin.on('end', () => {
    client.pipe(command, inputStream);
  });

  // await client.pipe(command, '');

  // client.disconnect();
})();
