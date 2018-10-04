const {Server: WSServer} = require('ws');
const {createServer} = require('http');

const app = require("./app");


const server = createServer(app);

//initialize the WebSocket server instance
const wss = new WSServer({server});


module.exports = {server, wss};
