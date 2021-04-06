import React from 'react'

const Menu = ({ playGame, board, setBoard, setSpeed }) => {
    return (
        <div className="menu">
            <div><h1>Snake</h1></div>
            <div className="row">
                <span> Number of rows:</span>
                <input type="number" value={board} onChange={(e) => setBoard(e.target.value)} max={20} min={10}/>
            </div>
            <div className="hint"> (Min: 10, Max: 20)</div>

            <div className="row">
                <span> Number of rows:</span>
                <select onChange={(e) => setSpeed(e.target.value)}>
                    <option value="1" defaultValue>x 1</option>
                    <option value="2">x 2</option>
                    <option value="3">x 3</option>
                    <option value="4">x 4</option>
                    <option value="5">x 5</option>
                </select>
            </div>
            <div className="hint"> (Slow: 1, Fast: 5)</div>

            <button className = "btn btn-large"onClick={()=> playGame(prev => !prev)}>Play Game</button>
        </div>
    )
}

export default Menu;
