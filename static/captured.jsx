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


export class Captured extends React.Component {

    render() {
        var chess = new Chess(this.props.fen);

        var types = {
            r: '♜',
            n: '♞',
            b: '♝',
            q: '♛',
            k: '♚',
            p: '♟'
        };

        const captured = chess.history({verbose: true})
            .filter(h => h.captured)
            .filter(h => h.color == this.props.color);

        return (
            <ul>
                {captured.map((f, i) => (
                    <li key={i}>
                        {types[f]}
                    </li>
                ))}
            </ul>
        )
    }

}


export const CapturedContainer = (props) => (
    <GameContext.Consumer>
        {val => <Captured fen={val.fen} color={props.color} />}
    </GameContext.Consumer>
);
