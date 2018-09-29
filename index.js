const express = require('express');

const router = require("./chess/router");
const {Game} = require("./chess/models");
const {User} = require("./models");


const app = require('./app');

app.get('/', async function (req, res) {
    const games = await Game.find({})
        .populate("player1")
        .populate("player2");
    res.render('index.html', {games, user: await User.findOne({_id: req.session.user_id})});
});

app.use('/chess', router);
