export const moveHandler = (direction, currentPos, boardSize) => {
    if (direction === "LEFT") return moveLeft(currentPos)
    if (direction === "RIGHT") return moveRight(currentPos)
    if (direction === "UP") return moveUp(currentPos, boardSize)
    if (direction === "DOWN") return moveDown(currentPos, boardSize)
}

// Moves that require subtraction
const moveNegative = (currentPos, num) => {
    return currentPos - num
}

// Moves that require addition
const movePositive = (currentPos, num) => {
    return currentPos + num
}

const moveLeft = (currentPos) => movePositive(currentPos, 1)
const moveRight = (currentPos) => moveNegative(currentPos, 1)
const moveUp = (currentPos, boardSize) => moveNegative(currentPos, boardSize)
const moveDown = (currentPos, boardSize) => movePositive(currentPos, boardSize)

const collisionChecking = () => {
    // Something goes here

}

export const test = () => {
    console.log("test")
    let pos = 50
    let size = 200
    console.log("Left: ", moveLeft(pos))
    console.log("Right: ", moveRight(pos))
    console.log("Up: ", moveUp(pos, size))
    console.log("Down: ", moveDown(pos, size)) 
}