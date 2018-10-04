const express = require('express');

const {Game} = require("./models");
const {User} = require("../models");


const router = new express.Router();

router.get('/my_games', async function (req, res) {
    const games = await Game.find({player1: req.session.user_id});
    res.json(games);
});

router.get('/game/:id', async function (req, res) {
    const game = await Game.findOne({_id: req.params.id});
    const user = await User.findOne({_id: req.session.user_id});
    const my_color = game.player1.equals(user._id) ? "w" : "b";
    res.render("board.html", {game, user, my_color});
});

router.post('/game/:id/moves', async function (req, res) {
    const game = await Game.findOne({_id: req.params.id});
    const user = await User.findOne({_id: req.session.user_id});
    game.fen = req.body.fen;
    game.moves.push(req.body.from + req.body.to);
    await game.save();
    res.render("board.html", {game, user});
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
