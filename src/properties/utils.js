export const initBoard = (size) => {
    let arr = []
    let counter = 0

    for (let i = 0; i < size; i++) {
        let rowArr = []
        for (let j = 0; j < size; j++) {
            rowArr.push(counter)
            counter ++
        }
        arr.push(rowArr)
    }
    return arr
}

export const getInitHead = (size) => {
    let halfBoard = size % 2 === 0 ? size / 2 : (size - 1) / 2
    let center = halfBoard * size + halfBoard + 1
    return center
}   