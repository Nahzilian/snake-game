import { useState, useEffect } from 'react'

import { initBoard } from '../utils/init'

import Snake from '../properties/snake'
import './stylesheets/Board.css'

const Cell = ({ isSnake = false, isFood = false, val = 0 }) => {
    
    return <div className={`${isFood ? "food" : isSnake ? "snake" : ""} cell`}>{val}</div>
}

const Row = ({ list, snake = new Set()}) => {
    return (<div className="row">
        {snake ? list.map((val) => <Cell val={val} key={val} isSnake={snake.has(val)}/>): null}
    </div>
    )
}

const Board = () => {
    const board = initBoard(10)
    const [snake, setSnake] = useState()

    useEffect(() => {
        let snk = new Snake(10)
        setSnake(snk.snakeSet) 
        
    }, [])


    return (<div>
        {snake ? board.map((val, key) => <Row list={val} key={key} snake={snake}/>) : null}
    </div>);
}

export default Board;