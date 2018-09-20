const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema({
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    fen: {type: String, default: () => "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},
    moves: {type: [String], default: () => []},
    start: {type: Date, default: Date.now}
});

const Game = mongoose.model('Game', gameSchema);

module.exports = {
    Game,
};
