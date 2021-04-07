import React, { useState, useEffect } from 'react';
import { SinglyLinkedList, Node } from '../../utils/linkedlist';
import { getCoordsInDirection, randomValue, getTailGrowthDirection, setDirectionForSnake, getDirectionFromKey } from '../../utils/directions';
import { useInterval } from '../../utils/useIntervals';
import './Board.css';

export default function Board({ boardSize, speed }) {
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
    const [BOARDSIZE, setBOARDSIZE] = useState(parseInt(boardSize) || 10);
    const [board, setBoard] = useState(boardGeneration(BOARDSIZE));
    const [snake, setSnake] = useState(new SinglyLinkedList(getCentralPoint(BOARDSIZE)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell])); // This is the body of the snake
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [oldDirection, setOldDirection] = useState(Direction.RIGHT);
    const [score, setScore] = useState(0);
    const [foodCell, setFoodCell] = useState(new Set([randomValue(BOARDSIZE)]));
    const [isGame, setIsGame] = useState(false);
    useEffect(() => {
        console.log(boardSize)
        window.addEventListener("keydown", event => {
            setOldDirection(direction);
            setDirection(prev => setDirectionForSnake(prev, event.key));
        })
    }, [])

    const resetGame = () => {
        let newHead = new SinglyLinkedList(getCentralPoint(BOARDSIZE))
        setBoard(boardGeneration(BOARDSIZE));
        setSnake(newHead);
        setSnakeCells(new Set([newHead.head.value.cell]));
        setDirection(Direction.RIGHT);
        setOldDirection(Direction.RIGHT);
        setScore(0);
        setFoodCell(new Set([randomValue(BOARDSIZE)]));
        setIsGame(false);
    }

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

        // Wining condition
        // If next pos is outside of the board
        if (nextPos.row > BOARDSIZE - 1 || nextPos.col > BOARDSIZE - 1) {
            console.log('Here 1')
            setIsGame(true);
            return;
        }
        if (nextPos.row < 0 || nextPos.col < 0) {
            console.log('Here 2')
            setIsGame(true);
            return;
        }

        // Create new cell position
        const nextHeadCell = board[nextPos.row][nextPos.col]


        // The new snake cell caused this to trigger
        if (snakeCells.has(nextHeadCell)) {
            console.log('Here 3')
            setIsGame(true);
            return;
        }
        // Check if new headcell is outside of board
        /**
         * For this part, maybe considered a different approach, since this is a bit of brute force way to do it
        */
        if (checkGameOver(nextHeadCell)) {
            console.log('Here 4')
            setIsGame(true);
            return;
        }

        // Creating new head
        const newHead = new Node({ row: nextPos.row, col: nextPos.col, cell: nextHeadCell });

        const curHead = snake.head;
        snake.head = newHead;
        curHead.next = newHead;

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.delete(snake.tail.value.cell);
        newSnakeCells.add(nextHeadCell);

        //console.log(newSnakeCells)
        snake.tail = snake.tail.next;
        if (snake.tail === null) snake.tail = snake.head;

        // If the next head cell is food
        if (foodCell.has(nextHeadCell)) {
            setFoodCell(generateFoodCell());
            setScore(oldScore => oldScore + 1);
            growSnake(newSnakeCells);
            handleFoodConsumption(newSnakeCells);
        }

        // setSnake(new SinglyLinkedList(newHead))
        setSnakeCells(newSnakeCells);
    }

    const generateFoodCell = () => {
        let food = randomValue(BOARDSIZE);
        while (snakeCells.has(food)) {
            food = randomValue(BOARDSIZE);
        }
        return new Set([food]);
    }

    const growSnake = (newSnakeCells) => {
        const nextCell = getTailGrowthDirection(snake.tail, direction, oldDirection, BOARDSIZE);
        if (!nextCell) return;

        const newSnakeCell = board[nextCell.row][nextCell.col];
        const newTail = new Node({
            row: nextCell.row,
            col: nextCell.col,
            cell: newSnakeCell
        })
        const currentTail = snake.tail;
        snake.tail = newTail;
        snake.tail.next = currentTail;
        newSnakeCells.add(newSnakeCell);
    }

    const handleFoodConsumption = newSnakeCells => {
        let nextFoodCell;
        while (true) {
            nextFoodCell = randomValue(BOARDSIZE);
            if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
                continue;
            break;
        }

    };


    useInterval(() => {
        if (!isGame) moveSnake();
    }, [speed])

    return (
        <div className="board">
            <div>Score: {score}</div>
            {isGame ? <div>Game over</div> : null}
            {isGame ? <button className="btn btn-large" onClick={resetGame}>Retry?</button>: null}
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
    for (let row = 0; row < size; row++) {
        const newRow = new Array(size).fill(0).map((cell, cellIndex) => cellIndex + size * row + 1);
        board.push(newRow);
    }
    return board;
}


