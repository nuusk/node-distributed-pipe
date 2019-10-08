const Client = require('./services/Client');

const client = new Client();

(async () => {
  await client.connect();
})();
