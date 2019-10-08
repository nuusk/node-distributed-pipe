require('dotenv').config();
const WebSocketServer = require('rpc-websockets').Server;
const { spawn } = require('child_process');
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
    this.initEvents();
  }

  initListeners() {
    this.ws.on('connection', () => {
      debug('client connected');
    });

    this.ws.on('error', (err) => {
      debug(err);
    });
  }

  initEvents() {
    this.ws.register('pipe', ({ command, stream }) => new Promise((resolve, reject) => {
      const program = command.split(' ')[0];
      const args = command.split(' ').slice(1);
      debug(`program: ${program}`);
      debug(`args: ${args}`);
      debug(`stream: ${stream}`);
      debug('~~~~~');

      let stderr = '';
      let response = '';

      const child = spawn(program, args);

      child.stdin.write(stream);
      child.stdin.end();

      child.stdin.setEncoding('utf-8');

      child.stdout.on('data', (data) => {
        debug(data.toString());
        response += data;
      });

      child.stderr.on('data', (data) => {
        debug(data.toString());
        stderr += data;
      });

      child.on('error', (err) => {
        reject(stderr);
        debug(err);
        process.exit(1);
      });

      child.on('close', (code) => {
        debug(`Sending back code ${code} output \n${response}`);
        resolve({ code, stream: response, stderr });
        debug(`Child process exited with code ${code}`);
      });

      return command;
    }));
  }
}

module.exports = Server;
