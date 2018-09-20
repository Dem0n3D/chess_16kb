const express = require('express');

const {Game} = require("./models");


const router = new express.Router();

router.get('/my_games', async function (req, res) {
    const games = await Game.find({player1: req.session.user_id});
    res.json(games);
});

router.post('/game', async function (req, res) {
    const game = new Game({player1: req.session.user_id});
    await game.save();
    res.json(game);
});


module.exports = router;
