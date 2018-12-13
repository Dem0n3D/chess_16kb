import '../node_modules/jquery-ui/themes/base/all.css';
import './style.css';
import './board.css';

import $ from 'jquery';
import 'jquery-ui-bundle';
import Chess from 'chess.js';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash/range';
import {DropTarget, DragSource} from 'react-dnd';
import {compose} from 'recompose';

import {GameContext} from "./contexts";


const types = {
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
    p: '♟'
};


export const Figure = ({type, color, connectDragSource, isDragging}) => connectDragSource(
    <div className={`figure ${color[0] == "b" ? "black" : "white"}`}>
        {types[type]}
    </div>
);


export const FigureContainer = compose(
    DragSource(
        "FIGURE",
        {
            beginDrag: (props) => ({
                type: props.type,
                coord: props.coord,
            }),
            canDrag: (props, monitor) => props.can_move,
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        })
    )
)(Figure);


export const Cell = ({children, connectDropTarget, isOver, canDrop}) => connectDropTarget(
    <td className={`cell ${isOver && canDrop ? "can_drop" : ""}`}>
        {children}
    </td>
);


export const CellContainer = compose(
    DropTarget(
        ["FIGURE"],
        {
            drop: (props, monitor) => {
                props.move(monitor.getItem().coord, props.coord);
            },
            canDrop: (props, monitor) => {
                return props.who_can_move.includes(monitor.getItem().coord);
            }
        },
        (connect, monitor) => ({
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    )
)(Cell);


export class Board extends React.Component {

    render() {
        // console.log(this.props.fen)
        var chess = new Chess(this.props.fen);
        const figures = chess.board();
        const who_can_move = chess.moves({verbose: true}).map(m => m.from);
        const possible_moves = chess.moves({verbose: true});

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
                            <CellContainer key={j}
                                           coord={`${"abcdefgh"[j]}${8-i}`}
                                           move={this.props.move}
                                           who_can_move={possible_moves.filter(m => m.to == `${"abcdefgh"[j]}${8-i}`)
                                               .map(m => m.from)}>
                                {figures[i][j] && (
                                    <FigureContainer type={figures[i][j].type}
                                                     color={figures[i][j].color}
                                                     coord={`${"abcdefgh"[j]}${8-i}`}
                                                     can_move={who_can_move.includes(`${"abcdefgh"[j]}${8-i}`)}/>
                                )}
                            </CellContainer>
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
        {val => <Board fen={val.fen} {...props} />}
    </GameContext.Consumer>
);
