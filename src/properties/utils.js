
export const getInitHead = (size) => {
    let center = size % 2 === 0 ? size / 2 : (size - 1) / 2
    return center * center
}   