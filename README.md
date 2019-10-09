# Distributed Pipe in Node.js

Allows you to pipe data streams between remote machines.
Based on rpc-websockets.

## Getting started

Clone the repo and install dependencies

```
git clone https://github.com/pietersweter/node-distributed-pipe.git
cd node-distributed-pipe
npm install
```

The project uses `dotenv` module, which binds environmental variables to the app (configured in `.env` file).
To manually change the configuration, change the values of following variables:
#### `DEBUG_ENABLED`
`true` / `false` allows to see debug logs
#### `SERVER_PORT`
default `localhost` address of the server
#### `SERVER_HOST`
default `8080` number of a port the server is listening on

## Server

Run the server on a remote machine with

```
./server.js
```

## Client

Run the client on your machine and use the server's address in your pipes.
Don't forget to add the command that will be run on the server.

For example:
```
./client.js localhost ls
```
will run command `ls` on `localhost` server.

Piping example:
```
ls | ./client.js localhost grep json
```
will pipe the output of `ls` (on local machine) to the `localhost` server and run `grep` on that stream.

## Authors

* **poe** - *Initial work* - [pietersweter](https://github.com/pietersweter)

## License

This project is licensed under the MIT License.
