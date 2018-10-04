const express = require('express');

const ws_router = express.Router();

const games = {};

ws_router.ws('/', function (client, req) {
    games[req.query.game_id] = games[req.query.game_id] || {};
    games[req.query.game_id][req.query.sid] = client;

    client.on('message', function (msg) {
        client.send(msg);
    });
    client.send("hi");
});


module.exports = {ws_router, games};
