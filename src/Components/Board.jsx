import { useState, useEffect } from 'react'

import { initBoard } from '../properties/utils'
import { useInterval } from '../properties/hooks'

import { moveHandler, movement, isColliding, moveCheck } from '../properties/movement'
import Snake from '../properties/snake'
import './stylesheets/Board.css'

const Cell = ({ isSnake = false, isFood = false, val = 0, boardSize }) => {
    const customSize = {
        width: Math.round(900 / boardSize),
        height: Math.round(900 / boardSize),
    }

    return <div
        className={`${isFood ? "food" : isSnake ? "snake" : ""} cell`}
        style={customSize}></div>
}

const Row = ({ list, snake = new Set(), boardSize = 10 }) => {
    return (<div className="row">
        {snake ? list.map((val) => <Cell
            val={val}
            key={val}
            isSnake={snake.has(val)}
            boardSize={boardSize} />) : null}
    </div>
    )
}

const Board = ({ size = 15 }) => {
    const board = initBoard(size)
    const [snake, setSnake] = useState()
    const [curHead, setCurHead] = useState()
    const [direction, setDirection] = useState('RIGHT')
    const [gameover, setGameOver] = useState(false)

    useEffect(() => {
        let snk = new Snake(size)
        setSnake(snk)
        setCurHead(snk.snake.head.val)
    }, [size])

    useEffect(() => {
        const detectNewDirection = (e) => {
            let nextDirection = moveCheck(direction, movement[e.key])
            console.log(nextDirection)
            setDirection(nextDirection)
        }

        window.addEventListener('keydown', detectNewDirection)

        return () => { window.removeEventListener('keydown', detectNewDirection) }
    }, [direction])

    useInterval(() => {
        if (snake && !gameover) {
            setSnake(snk => {
                let nextMove = moveHandler(direction, curHead, size)

                // collision
                // Problem: This thing is being called due to direction not being updated
                if (isColliding(nextMove, curHead, size, direction, snk)) {
                    setGameOver(true)
                    return
                }

                setCurHead(snk.snake.head.val)
                snk.snakeUpdate(nextMove)
                return snk
            })
        }
    }, 700)




    return (<div>
        {gameover ? <div>Game over</div> : null}

        {snake && snake.snakeSet ? board.map((val, key) => <Row list={val} key={key} snake={snake.snakeSet} boardSize={size} />) : null}
    </div>);
}

export default Board;