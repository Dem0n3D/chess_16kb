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

router.post('/game/join/:id', async function (req, res) {
    const game = await Game.findOne({_id: req.params.id});
    if (game.player2) {
        res.status(400, "Game is already full!").end();
    }
    if (game.player1._id.equals(req.session.user_id)) {
        res.status(400, "Can't play vs yourself!").end();
    }
    game.player2 = req.session.user_id;
    await game.save();
    res.json(game);
});


module.exports = router;
