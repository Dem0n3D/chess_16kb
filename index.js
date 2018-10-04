const express = require('express');

const router = require("./chess/router");
const {ws_router} = require("./chess/websocket");
const {Game} = require("./chess/models");
const {User} = require("./models");


const app = require('./app');

app.get('/', async function (req, res) {
    const games = await Game.find({})
        .populate("player1")
        .populate("player2");
    const user = await User.findOne({_id: req.session.user_id});
    res.render('index.html', {games, user});
});

app.use('/chess', router);
app.use('/ws', ws_router);
