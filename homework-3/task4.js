function calculateFactorial(n) {
  function fact(n, acc) {
    if (n < 2) {
      return acc
    } else {
      return fact(n - 1, n * acc)
    }
  }

  return fact(n, 1)
}

function power(base, exponent) {
  if (exponent === 0) {
    return 1
  }
  return base * power(base, exponent - 1)
}

// testing
console.log(calculateFactorial(5))
console.log(power(2, 4))
