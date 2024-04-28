function measureArrayPerformance(func, arr) {
  const startTime = performance.now()
  func(arr)
  const endTime = performance.now()
  const executionTime = endTime - startTime
  console.log(`Execution time: ${executionTime} milliseconds`)
}

function exampleFunction(arr) {
  let sum = 0

  for (let num of arr) {
    sum += num
  }
  console.log('Sum:', sum)
}

// doouble each element
function customMap(arr) {
  return arr.map((num) => num * 2)
}

// filter even numbers
function customFilter(arr) {
  return arr.filter((num) => num % 2 !== 0)
}

// sum of all elements
function customReduce(arr) {
  return arr.reduce((acc, num) => acc + num, 0)
}

// long array for testing
const testArray = Array.from({ length: 100000 }, (_, index) => index + 1)

// build in methods
console.log('Performance of built-in array methods:')
measureArrayPerformance((arr) => arr.map((num) => num * 2), testArray)
measureArrayPerformance((arr) => arr.filter((num) => num % 2 !== 0), testArray)
measureArrayPerformance(
  (arr) => arr.reduce((acc, num) => acc + num, 0),
  testArray
)

// custom array manipulation functions
console.log('Performance of custom array manipulation functions:')
measureArrayPerformance(customMap, testArray)
measureArrayPerformance(customFilter, testArray)
measureArrayPerformance(customReduce, testArray)
