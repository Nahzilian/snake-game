import React, { useState, useEffect } from 'react';
import { SinglyLinkedList } from '../../utils/linkedlist';
import { getCoordsInDirection } from '../../utils/directions';
import { useInterval } from '../../utils/useIntervals';
import './Board.css';

export default function Board() {
    const BOARDSIZE = 15;
    const Direction = {
        UP: 'UP',
        DOWN: 'DOWN',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT'
    }

    const getCentralPoint = size => {
        let row = Math.floor(size / 2), col = Math.floor(size / 2);
        let cell = board[row][col]
        return { row, col, cell };
    }

    // Setting a 10 x 10 board
    const [board, setBoard] = useState(boardGeneration(BOARDSIZE));
    const [snake, setSnake] = useState(new SinglyLinkedList(getCentralPoint(BOARDSIZE)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell])); // This is the body of the snake
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [move, setMove] = useState(100);

    
    const moveSnake = () => {
        const snakePos = {
            row: snake.head.value.row,
            col: snake.head.value.col
        }
        const nextPos = getCoordsInDirection(snakePos, direction);
        const nextHeadCell = board[nextPos.row][nextPos.col]
        const newHead = { row: nextPos.row, col: nextPos.col, cell: nextHeadCell}
        setSnake(new SinglyLinkedList(newHead))
        setSnakeCells(new Set([nextHeadCell]));
    }
    
    useInterval(() => {
        moveSnake();
        //setMove(prev => prev - 1);
        //setSnakeCells(prev => new Set([move]));
        //console.log(snakeCells);
    }, [1000])

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`cell ${snakeCells.has(cell) ? 'snake-cell' : ''}`}>
                            {cell}
                        </div>
                        ))}
                </div>
            ))}
        </div>
    )
}

const boardGeneration = size => {
    const board = [];
    for (let row = 0; row < size; row ++ ) {
        const newRow = new Array(size).fill(0).map((cell, cellIndex) => cellIndex + size * row + 1);
        board.push(newRow);
    }
    return board;
}


