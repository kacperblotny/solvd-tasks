class Queue {
  constructor() {
    this.items = []
  }

  // add element to queue (at the end)
  enqueue(element) {
    this.items.push(element)
  }

  // remove element from queue (first)
  dequeue() {
    if (this.isEmpty()) return null
    return this.items.shift()
  }

  // check next element to leave the queue (first)
  peek() {
    if (this.isEmpty()) return null
    return this.items[0]
  }

  // check size of queue
  size() {
    return this.items.length
  }
}
