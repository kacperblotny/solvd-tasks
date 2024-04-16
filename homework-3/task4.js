function factorial(n) {
  if (n === 0) {
    return 1
  }
  return n * factorial(n - 1)
}

function power(base, exponent) {
  if (exponent === 0) {
    return 1
  }
  return base * power(base, exponent - 1)
}

// testing
console.log(factorial(5))

console.log(power(2, 4))
