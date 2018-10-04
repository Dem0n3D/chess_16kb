const {Server: WSServer} = require('ws');
const {createServer} = require('http');

const app = require("./app");
const {server} = require("./websocket");


require("./db");
require("./index");
require("./auth");

require("./chess/websocket");


//start our server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
