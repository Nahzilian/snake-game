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