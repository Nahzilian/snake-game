import React, { useState } from 'react';
import { SinglyLinkedList } from '../../utils/linkedlist';
import { getCoordsInDirection } from '../../utils/directions';
import './Board.css';

export default function Board() {
    const BOARDSIZE = 10;
    const Direction = {
        UP: 'UP',
        DOWN: 'DOWN',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT'
    }
    // Setting a 10 x 10 board
    const [board, setBoard] = useState(boardGeneration(BOARDSIZE));
    const [snakeCells, setSnakeCells] = useState(new Set([44])); // This is the body of the snake
    const [snake, setSnake] = useState(new SinglyLinkedList(44));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const moveSnake = () => {
        const snakePos = {
            row: snake.head.value.row,
            col: snake.head.value.col
        }

        const nextHeadCoords = getCoordsInDirection(snakePos, direction);
    }
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`cell ${snakeCells.has(cell) ? 'snake-cell' : ''}`}>{cell}</div>
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