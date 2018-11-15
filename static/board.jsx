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

import {GameContext} from "./contexts";


export class Board extends React.Component {

    render() {
        var chess = new Chess(this.props.fen);
        const figures = chess.board();

        var types = {
            r: '♜',
            n: '♞',
            b: '♝',
            q: '♛',
            k: '♚',
            p: '♟'
        };

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


export const BoardContainer = (props) => (
    <GameContext.Consumer>
        {val => <Board fen={val.fen} />}
    </GameContext.Consumer>
);
