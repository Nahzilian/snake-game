import React, { useState, useEffect } from 'react';
import { SinglyLinkedList, Node } from '../../utils/linkedlist';
import { getCoordsInDirection, getDirectionFromKey,randomValue, getTailGrowthDirection } from '../../utils/directions';
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

        // Wining condition
        // If next pos is outside of the board
        if(nextPos.row > BOARDSIZE - 1 || nextPos.col > BOARDSIZE - 1) {
            setIsGame(true);
            return;
        }
        if(nextPos.row < 0 || nextPos.col < 0) {
            setIsGame(true);
            return;
        } 

        // Create new cell position
        const nextHeadCell = board[nextPos.row][nextPos.col]


        // Check if new headcell is outside of board
        /**
         * For this part, maybe considered a different approach, since this is a bit of brute force way to do it
        */
        if (checkGameOver(nextHeadCell)) {
            setIsGame(true);
            return;
        }

        // Creating new head
        const newHead = new Node({ row: nextPos.row, col: nextPos.col, cell: nextHeadCell});
        
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
            setFoodCell(new Set([randomValue(BOARDSIZE)]));
            setScore(oldScore => oldScore + 1);
            growSnake(newSnakeCells);
            handleFoodConsumption(newSnakeCells);
        }
        
        // setSnake(new SinglyLinkedList(newHead))
        setSnakeCells(newSnakeCells);
    }
    
    const growSnake = (newSnakeCells) => {
        const nextCell = getTailGrowthDirection(snake.tail, direction);
        if(!nextCell) return;

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
        if(!isGame) moveSnake();
    }, [150])

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


