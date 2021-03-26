var KeySetting = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
}

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

export const getCoordsInDirection = (coords, direction) => {
    let rowAcc = 0, colAcc = 0;
    if (direction === Direction.UP) rowAcc = -1;
    else if (direction === Direction.DOWN) rowAcc = 1;
    else if (direction === Direction.LEFT) colAcc = -1;
    else if (direction === Direction.RIGHT) colAcc = 1;
    return {
        row: coords.row + rowAcc,
        col: coords.col + colAcc
    }
}

export const getDirectionFromKey = (key) => {
    if(key === KeySetting.UP) return Direction.UP;
    if(key === KeySetting.DOWN) return Direction.DOWN;
    if(key === KeySetting.LEFT) return Direction.LEFT;
    if(key === KeySetting.RIGHT) return Direction.RIGHT;
    return '';
}

export const randomValue = (size) => {
    return Math.floor(Math.random() * (size ** 2) + 1);
}

export const setDirectionForSnake = (curKey, nextKey) => {
    const cNextKey = getDirectionFromKey(nextKey);
    if (!isOppositeDirection(curKey, cNextKey)) {
        return cNextKey
    } else {
        return curKey
    }
}

const isOppositeDirection = (curKey, nextKey) => {
    if(curKey === Direction.DOWN && nextKey === Direction.UP) return true;
    if(curKey === Direction.UP && nextKey === Direction.DOWN) return true;
    if(curKey === Direction.LEFT && nextKey === Direction.RIGHT) return true;
    if(curKey === Direction.RIGHT && nextKey === Direction.LEFT) return true;
    return false
}

export const keyBinding = () => {
    // Change 
}

export const getTailGrowthDirection = (tail, direction, size) => {
    let growDirection;
    let tailRow = tail.value.row;
    let tailCol = tail.value.col;
    if (direction === Direction.UP) growDirection = Direction.DOWN;
    if (direction === Direction.RIGHT) growDirection = Direction.LEFT;
    if (direction === Direction.DOWN) growDirection = Direction.UP;
    if (direction === Direction.LEFT) growDirection = Direction.RIGHT;
    if (direction === Direction.UP && tailCol - 1 > 0) growDirection = Direction.UP;
    if (direction === Direction.DOWN && tailCol + 1 < size) growDirection = Direction.DOWN;
    if (direction === Direction.LEFT && tailRow - 1 > 0) growDirection = Direction.LEFT;
    if (direction === Direction.UP && tailRow + 1 < size) growDirection = Direction.RIGHT;

    const curTail = {
        row: tailRow,
        col: tailCol,
    }
    
    console.log(growDirection);
    console.log(curTail);

    return getCoordsInDirection(curTail, growDirection);
}