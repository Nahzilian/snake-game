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
        let snakeSet = new Set()
        while (tempHead.next) {
            snakeSet.add(value)
            let tempVal = tempHead.val
            tempHead.val = value
            value = tempVal
            tempHead = tempHead.next
        }

        return snakeSet
    }

    print() {
        let tempHead = this.head
        while (tempHead.next) {
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
        this.snakeSet = new Set()
        this.snakeSet.add(center)
    }

    test() {
        console.log("Snake update")
        this.snake.addNode(1)
        this.snake.addNode(2)
        this.snake.addNode(3)
        this.snake.addNode(4)

        for (let i = 0; i < 100; i++) {
            this.snake.updateValues(i)

            this.snake.print()
        }
    }

    snakeUpdate(newPos) {
        let snakeSet = this.snake.updateValues(newPos)
        this.snakeSet = snakeSet
    }
}