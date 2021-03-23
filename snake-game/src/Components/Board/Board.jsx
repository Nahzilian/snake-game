import React, { useState, useEffect } from 'react';
import { SinglyLinkedList } from '../../utils/linkedlist';
import { getCoordsInDirection, getDirectionFromKey,randomValue } from '../../utils/directions';
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

    // Setting a 15 x 15 board
    const [board, setBoard] = useState(boardGeneration(BOARDSIZE));
    const [snake, setSnake] = useState(new SinglyLinkedList(getCentralPoint(BOARDSIZE)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell])); // This is the body of the snake
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [score, setScore] = useState(0);
    const [foodCell, setFoodCell] = useState(new Set([randomValue(BOARDSIZE)]));
    const [isGame, setIsGame] = useState(false);

    useEffect(() => {
        window.addEventListener("keydown", event => {
            setDirection(getDirectionFromKey(event.key));
        })
    },[])
    
    const checkGameOver = (nextHeadCell) => {
        if (!nextHeadCell) return true;
        return false
    }

    const moveSnake = () => {
        const snakePos = {
            row: snake.head.value.row,
            col: snake.head.value.col
        }
        const nextPos = getCoordsInDirection(snakePos, direction);
        if(nextPos.row > BOARDSIZE - 1 || nextPos.col > BOARDSIZE - 1) {
            setIsGame(true);
            return;
        } 

        if(nextPos.row < 0 || nextPos.col < 0) {
            setIsGame(true);
            return;
        } 

        const nextHeadCell = board[nextPos.row][nextPos.col]
        
        if (checkGameOver(nextHeadCell)) {
            setIsGame(true);
            return;
        }
        // If the next head cell is food
        if (foodCell.has(nextHeadCell)) {
            setFoodCell(new Set([randomValue(BOARDSIZE)]));
            setScore(oldScore => oldScore + 1);
        }

        const newHead = { row: nextPos.row, col: nextPos.col, cell: nextHeadCell}
        setSnake(new SinglyLinkedList(newHead))
        setSnakeCells(new Set([nextHeadCell]));
    }
    
    useInterval(() => {
        if(!isGame) moveSnake();
    }, [700])

    return (
        <div className="board">
            <div>Score: {score}</div>
            {isGame?<div>Game over</div>: ''}
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`cell ${foodCell.has(cell) ? 'food-cell' : ''} ${snakeCells.has(cell) ? 'snake-cell' : ''}`}>
                            {/* {cell} */}
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


