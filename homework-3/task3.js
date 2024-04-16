function createCounter() {
  let count = 0

  return function counter() {
    count++
    return count
  }
}

function repeatFunction(fnc, number) {
  if (number < 0) {
    return function () {
      while (true) {
        fnc()
      }
    }
  } else {
    return function () {
      for (let i = 0; i < number; i++) {
        fnc()
      }
    }
  }
}

// testing

//first counter
const counter1 = createCounter()
console.log(counter1()) // output: 1
console.log(counter1()) // output: 2

//second counter
const counter2 = createCounter()
console.log(counter2()) // output: 1 (independent count)

function repeatMe() {
  console.log('Hello, world!')
}

const x = 2
const repeatXtimes = repeatFunction(repeatMe, x)
repeatXtimes()

const repeatIndefinitely = repeatFunction(repeatMe, -1)
// repeatIndefinitely()
