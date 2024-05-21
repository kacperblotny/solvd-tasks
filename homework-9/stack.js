class Stack {
  constructor() {
    this.items = []
  }

  // push element to stack
  push(element) {
    this.items.push(element)
  }
  // pop element from stack
  pop() {
    if (this.isEmpty()) return null
    return this.items.pop()
  }
  // peek top of the stack
  peek() {
    if (this.isEmpty()) return null
    return this.items[this.items.length - 1]
  }

  // check if stack is empty
  isEmpty() {
    return this.items.length === 0
  }

  // check length of stack
  size() {
    return this.items.length
  }
}

class MinMaxStack extends Stack {
  constructor() {
    super()
    this.minStack = []
    this.maxStack = []
  }

  push(element) {
    super.push(element)

    // push element to minStack
    if (
      this.minStack.length === 0 ||
      element <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(element)
    }

    // push element to maxStack
    if (
      this.maxStack.length === 0 ||
      element >= this.maxStack[this.maxStack.length - 1]
    ) {
      this.maxStack.push(element)
    }
  }

  pop() {
    const poppedElement = super.pop()

    // pop element from minStack if it is the minimum
    if (poppedElement === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop()
    }

    // pop element from maxStack if it is the maximum
    if (poppedElement === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop()
    }

    return poppedElement
  }

  getMin() {
    if (this.minStack.length === 0) {
      throw new Error('Stack is empty')
    }
    return this.minStack[this.minStack.length - 1]
  }

  getMax() {
    if (this.maxStack.length === 0) {
      throw new Error('Stack is empty')
    }
    return this.maxStack[this.maxStack.length - 1]
  }
}

const minMaxStack = new MinMaxStack()

minMaxStack.push(3)
minMaxStack.push(5)
console.log(minMaxStack.getMin())
console.log(minMaxStack.getMax())

minMaxStack.push(2)
minMaxStack.push(1)
console.log(minMaxStack.getMin())
console.log(minMaxStack.getMax())

minMaxStack.pop()
console.log(minMaxStack.getMin())
console.log(minMaxStack.getMax())

minMaxStack.pop()
console.log(minMaxStack.getMin())
console.log(minMaxStack.getMax())
