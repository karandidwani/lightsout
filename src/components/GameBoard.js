import React, { Component } from 'react';
import Cell from './Cell';

import '../GameBoard.css';

class GameBoard extends Component {

    static defaultProps = {
        nRows: 5,
        nCols: 5,
        chanceLightStartsOn: 0.25
    }

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        }
        this.createBoard = this.createBoard.bind(this);
        this.flipCells = this.flipCells.bind(this);
        this.generateBoardFromState = this.generateBoardFromState.bind(this);
    }

    flipCells(coords) {
        let { nCols, nRows } = this.props;
        let coordsArr = coords.split("-");
        let x = parseInt(coordsArr[0]);
        let y = parseInt(coordsArr[1]);
        console.log(x, " ", y);
        let board = this.state.board;

        function flipCells(x, y) {
            if (x >= 0 && y >= 0 && x < nCols && y < nRows) {
                console.log("inside if");
                board[x][y] = !board[x][y];
            }
        }

        flipCells(x, y);
        flipCells(x + 1, y);
        flipCells(x - 1, y);
        flipCells(x, y + 1);
        flipCells(x, y - 1);

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board, hasWon });

    }

    createBoard() {
        let board = [];

        for (let i = 0; i < this.props.nCols; i++) {
            let row = [];
            for (let j = 0; j < this.props.nRows; j++) {
                let random = Math.random() < this.props.chanceLightStartsOn;
                row.push(random);
            }
            board.push(row);
        }
        return board;
    }

    generateBoardFromState() {
        let gameBoard = [];
        for (let i = 0; i < this.props.nCols; i++) {
            let gameRow = [];
            for (let j = 0; j < this.props.nRows; j++) {
                let coords = `${i}-${j}`;
                gameRow.push(<Cell
                    key={coords}
                    lightOn={this.state.board[i][j]}
                    flipCellsAroundMe={() => this.flipCells(coords)}
                />);
            }
            gameBoard.push(<tr key={`row-${i}`}>{gameRow}</tr>);

        }
        return gameBoard;
    }

    render() {
        const board = this.generateBoardFromState();
        return (
            <div>
                {this.state.hasWon ? (
                    <div>
                        <div className='winner'>
                            <span className='neon-orange'>YOU</span>
                            <span className='neon-blue'>WIN!</span>
                        </div>
                    </div>
                ) :
                    (
                        <div>
                            <div className='Board-title'>
                                <div className='neon-orange'>Lights</div>
                                <div className='neon-blue'>Out</div>
                            </div>
                            <table className='Board'>
                                <tbody>
                                    {board}
                                </tbody>
                            </table>

                        </div>
                    )
                }
            </div>
        )
    }
}

export default GameBoard;