// list node construsctor for linked list
class ListNode {
  constructor(value) {
    // create a singly linked list
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  insert(value) {
    const newNode = new ListNode(value)
    // if list head empty, insert
    if (this.head === null) {
      this.head = newNode
    } else {
      // list has head so keep looking for a node that is empty
      let current = this.head
      while (current.next !== null) {
        current = current.next
      }
      // insert node
      current.next = newNode
    }
  }

  delete(value) {
    // if is empty return null
    if (this.head === null) return null

    //  if the node to be deleted is head, remove it by pointing head to the next node
    if (this.head.value === value) {
      this.head = this.head.next
      return
    }

    let current = this.head
    // check the list to find the node to delete
    while (current.next !== null && current.next.value !== value) {
      current = current.next
    }
    // if the node to delete is found, remove it by linking the previous node to the next node
    if (current.next !== null) {
      current.next = current.next.next
    }
  }

  search(value) {
    let current = this.head
    // check the list to find the node with the specified value
    while (current !== null) {
      if (current.value === value) return current
      current = current.next
    }
    // Return null if the node is not found
    return null
  }
}

function hasCycle(head) {
  // if the list is empty or has only one node, it cannot have a cycle
  if (head === null || head.next === null) {
    return false
  }

  let slow = head // tortoise
  let fast = head.next // hare

  // check the list with two pointers moving at different speeds
  while (slow !== fast) {
    // if fast pointer reaches the end, there is no cycle
    if (fast === null || fast.next === null) {
      return false
    }
    slow = slow.next // one step
    fast = fast.next.next // two steps
  }

  // if slow and fast pointers meet, there is a cycle
  return true
}

const myList = new LinkedList()

myList.insert(1)
myList.insert(2)
myList.insert(3)
myList.insert(4)
myList.insert(5)

console.log(hasCycle(myList.head)) // output: false

// creating a cycle in the linked list
myList.head.next.next.next.next.next = myList.head.next

console.log(hasCycle(myList.head)) // output: true
