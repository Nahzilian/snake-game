import { getInitHead } from './utils'

class Node {
    constructor(val, next = null) {
        this.val = val
        this.next = next
    }
}

class LinkedList {
    constructor(head) {
        this.head = head
        this.tail = head

    }

    addNode(value) {
        let node = new Node(value)
        node.next = this.head
        this.head = node
    }

    updateValues(newValue) {
        let tempHead = this.head
        let value = newValue
        let newSet = new Set()
        while (tempHead) {
            let tempVal = tempHead.val
            tempHead.val = value
            value = tempVal
            tempHead = tempHead.next
            newSet.add(value)
        }

        return newSet
    }

    print() {
        let tempHead = this.head
        while (tempHead) {
            console.log(tempHead.val)
            tempHead = tempHead.next
        }
    }

    removeTail() {

    }
}

export default class Snake {
    constructor(boardSize) {
        let center = getInitHead(boardSize)

        let head = new Node(center)
        this.snake = new LinkedList(head)
        this.snake.addNode(center + 1)
        this.snake.addNode(center + 2)
        this.snake.addNode(center + 3)
        this.snake.addNode(center + 4)

        
        // Add snake
        this.snakeSet = new Set()
        this.snakeSet.add(center)
        this.snakeSet.add(center + 1)
        this.snakeSet.add(center + 2)
        this.snakeSet.add(center + 3)
        this.snakeSet.add(center + 4)

    }

    addCell (cell) {
        this.snake.addNode(cell)
        this.snakeSet.add(cell)
    }

    // test() {
    //     console.log("Snake update")
    //     this.snake.addNode(1)
    //     this.snake.addNode(2)
    //     this.snake.addNode(3)
    //     this.snake.addNode(4)

    //     for (let i = 0; i < 100; i++) {
    //         this.snake.updateValues(i)

    //         this.snake.print()
    //     }
    // }

    snakeUpdate(newPos) {
        let snakeSet = this.snake.updateValues(newPos)
        this.snakeSet = snakeSet
    }
}