import '../node_modules/jquery-ui/themes/base/all.css';
import './style.css';
import './board.css';

import $ from 'jquery';
import 'jquery-ui-bundle';
import guid from 'uuid/v4';
import Chess from 'chess.js';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash/range';


class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        }
    }

    componentWillMount() {
        axios.get(`/chess/game/${data.id}/json`)
            .then(res => {
                this.setState({fen: res.data.game.fen})
            });
    }

    render() {
        var chess = new Chess(this.state.fen);
        const figures = chess.board();

        var types = {
            r: '♜',
            n: '♞',
            b: '♝',
            q: '♛',
            k: '♚',
            p: '♟'
        };

        console.log(figures)

        return (
            <table>
                <tbody>
                {range(8).map(i => (
                    <tr key={i}>
                        <td>
                            {8 - i}
                        </td>
                        {range(8).map(j => (
                            <td className="cell" key={j}>
                                {figures[i][j] && (
                                    <div className={`figure ${figures[i][j].color == "b" ? "black" : "white"}`}>
                                        {types[figures[i][j].type]}
                                    </div>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                <tr>
                    {range(8).map(j => (
                        <td key={j}>
                            {"abcdefgh"[j]}
                        </td>
                    ))}
                    <td></td>
                </tr>
                </tbody>
            </table>
        );
    }

}

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(<Board/>, document.getElementById("board"));
});
