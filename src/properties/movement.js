export const movement = {
    ArrowDown: "DOWN",
    ArrowUp: "UP",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT"
}

export const moveHandler = (direction, currentPos, boardSize) => {
    // let direction = movement[dir]

    if (direction === "LEFT") return moveLeft(currentPos)
    if (direction === "RIGHT") return moveRight(currentPos)
    if (direction === "UP") return moveUp(currentPos, boardSize)
    if (direction === "DOWN") return moveDown(currentPos, boardSize)
}

export const moveCheck = (prev, next) => {
    console.log(prev)
    console.log(next)
    if(prev === next) return prev
    if(prev === "LEFT" && next === "RIGHT") return prev
    if(prev === "RIGHT" && next === "LEFT") return prev
    if(prev === "UP" && next === "DOWN") return prev
    if(prev === "DOWN" && next === "UP") return prev
    return next
}


// Moves that require subtraction
const moveNegative = (currentPos, num) => {
    return currentPos - num
}


// Moves that require addition
const movePositive = (currentPos, num) => {
    return currentPos + num
}

const moveLeft = (currentPos) => moveNegative(currentPos, 1)
const moveRight = (currentPos) => movePositive(currentPos, 1)
const moveUp = (currentPos, boardSize) => moveNegative(currentPos, boardSize)
const moveDown = (currentPos, boardSize) => movePositive(currentPos, boardSize)

export const isColliding = (nextPos, curPos, size, direction, snake) => {
    /**
     * Cases:
     * If snake hit border:
     *  Upper border: negative numbers
     *  Lower border: Larger than size
     *  Left border:
     *  Right border:
     * If snake goes over itself
    */

    if(snake.snakeSet.has(nextPos)) return true

    if (nextPos < 0) return true

    if (nextPos >= size * size) return true
    // Left border
    if (curPos % size === 0 && nextPos === curPos - 1 && direction === "LEFT") return true
    // Right norder
    if (nextPos % size === 0 && nextPos === curPos + 1 && direction === "RIGHT") return true

    return false

}

export const test = () => {
    let pos = 50
    let size = 200
    // console.log("Left: ", moveLeft(pos))
    // console.log("Right: ", moveRight(pos))
    // console.log("Up: ", moveUp(pos, size))
    // console.log("Down: ", moveDown(pos, size)) 
}