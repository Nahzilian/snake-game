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

export const keyBinding = () => {
    // Change 
}

export const getTailGrowthDirection = (tail, direction) => {
    let growDirection;
    if (direction === Direction.UP) growDirection = Direction.DOWN;
    if (direction === Direction.RIGHT) growDirection = Direction.LEFT;
    if (direction === Direction.DOWN) growDirection = Direction.UP;
    if (direction === Direction.LEFT) growDirection = Direction.RIGHT;
    
    const curTail = {
        row: tail.value.row,
        col: tail.value.col,
    }

    return getCoordsInDirection(curTail, growDirection);
}