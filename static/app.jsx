import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import {Board, BoardContainer} from "./board";
import {GameContext} from "./contexts";
import {CapturedContainer} from "./captured";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        };
    }

    componentWillMount() {
        axios.get(`/chess/game/${data.id}/json`)
            .then(res => {
                this.setState({fen: res.data.game.fen})
            });
    }

    render() {
        return (
            <div>
                <GameContext.Provider value={this.state}>
                    <BoardContainer />
                    <CapturedContainer color={'w'}/>
                    <CapturedContainer color={'b'}/>
                </GameContext.Provider>
            </div>
        );
    }

}


document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(<App/>, document.getElementById("board"));
});
