function lazyMap(array, mappingFunction) {
  let index = 0

  return {
    next: function () {
      if (index < array.length) {
        return { value: mappingFunction(array[index++]), done: false }
      } else {
        return { done: true }
      }
    },
  }
}

function fibonacciGenerator() {
  let prev = 0
  let current = 1

  return {
    [Symbol.iterator]: function () {
      return {
        next: function () {
          const temp = prev
          prev = current
          current += temp
          return { value: temp, done: false }
        },
      }
    },
  }
}

//testing
console.log('lazy map')
const arr = [1, 2, 3, 4, 5]

//double each element
const lazySquares = lazyMap(arr, (x) => x + x)

//generator function to fire one at a time
let result = lazySquares.next()
while (!result.done) {
  console.log(result.value)
  result = lazySquares.next()
}

console.log('fibonacci')
//set number to break
const fibBreak = 100

const fib = fibonacciGenerator()

for (const value of fib) {
  console.log(value)
  if (value > fibBreak) break
}
