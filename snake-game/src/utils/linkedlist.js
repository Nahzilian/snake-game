export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class SinglyLinkedList {
    constructor(value) {
        const node = new Node(value);
        this.head = node;
        // Keep track of tail
        this.tail = node;
    }
}

