import { useState, useEffect } from 'react'

import { initBoard } from '../properties/utils'
import { useInterval } from '../properties/hooks'


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

const Board = ({ size = 10 }) => {
    const board = initBoard(size)
    const [snake, setSnake] = useState()
    const [counter, setCounter] = useState(50)

    useEffect(() => {
        let snk = new Snake(size)
        setSnake(snk)
    }, [size])

    // useInterval(() => {
    //     if (snake) {
    //         setSnake(snk => {

    //             console.log("Snake: ", snk)
    //             console.log("Counter: ", counter)
    //             snk.snakeUpdate(counter)
    //             setCounter(counter - 1)
    //             return snk
    //         })
    //     }
    // }
    //     , 1000)




    return (<div>
        {snake && snake.snakeSet ? board.map((val, key) => <Row list={val} key={key} snake={snake.snakeSet} boardSize={size} />) : null}
    </div>);
}

export default Board;