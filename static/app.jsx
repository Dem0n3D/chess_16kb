import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import guid from 'uuid/v4';


import {Board, BoardContainer} from "./board";
import {GameContext} from "./contexts";
import {CapturedContainer} from "./captured";
import Chess from "chess.js";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        };

        this.ws = new WebSocket(`ws://localhost:8080/ws?sid=${guid()}&game_id=${data.id}`);
        this.ws.onmessage = message => this.setState({fen: message.data});
    }

    componentWillMount() {
        axios.get(`/chess/game/${data.id}/json`)
            .then(res => {
                this.setState({fen: res.data.game.fen})
            });
    }

    move(from, to) {
        const chess = new Chess(this.state.fen);
        chess.move({from, to});
        const params = {
            from: from,
            to: to,
            fen: chess.fen(),
        };
        axios.post(`/chess/game/${data.id}/moves`, params)
            .then(res => {
                // this.setState({fen: chess.fen()});
            });
    }

    render() {
        return (
            <div>
                <GameContext.Provider value={this.state}>
                    <BoardContainer move={this.move.bind(this)} />
                    <CapturedContainer color={'w'}/>
                    <CapturedContainer color={'b'}/>
                </GameContext.Provider>
            </div>
        );
    }

}


const AppContainer = DragDropContext(HTML5Backend)(App);

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(<AppContainer/>, document.getElementById("board"));
});
