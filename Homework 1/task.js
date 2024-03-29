function addStrings(num1, num2) {
  let result = ''
  let carry = 0

  let i = num1.length - 1
  let j = num2.length - 1

  while (i >= 0 || j >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(num1[i]) : 0
    const digit2 = j >= 0 ? parseInt(num2[j]) : 0

    const sum = digit1 + digit2 + carry

    result = (sum % 10) + result
    carry = Math.floor(sum / 10)

    i--
    j--
  }

  return result
}

function subtractStrings(num1, num2) {
  let result = ''
  let borrow = 0

  let i = num1.length - 1
  let j = num2.length - 1

  while (i >= 0) {
    const digit1 = parseInt(num1[i])
    const digit2 = j >= 0 ? parseInt(num2[j]) : 0

    let diff = digit1 - digit2 - borrow

    if (diff < 0) {
      diff += 10
      borrow = 1
    } else {
      borrow = 0
    }

    result = diff + result

    i--
    j--
  }

  return result.replace(/^0+/, '') // remove zeros
}

function divideStrings(num1, num2) {
  let quotient = ''
  let dividend = ''

  for (let i = 0; i < num1.length; i++) {
    dividend += num1[i]

    let quotientDigit = 0

    while (compareStrings(dividend, num2) >= 0) {
      dividend = subtractStrings(dividend, num2)
      quotientDigit++
    }
    quotient += quotientDigit
  }

  return quotient.replace(/^0+/, '') || '0' // remove zeros
}

function multiplyStrings(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0'

  const product = Array(num1.length + num2.length).fill(0)

  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const digit1 = parseInt(num1[i])
      const digit2 = parseInt(num2[j])

      const multiply = digit1 * digit2
      const sum = multiply + product[i + j + 1]

      product[i + j] += Math.floor(sum / 10)
      product[i + j + 1] = sum % 10
    }
  }

  return product.join('').replace(/^0+/, '') // remove zeros
}

// additional helper function to compare two strings
function compareStrings(str1, str2) {
  if (str1.length > str2.length) return 1
  if (str1.length < str2.length) return -1
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] > str2[i]) return 1
    if (str1[i] < str2[i]) return -1
  }

  return 0
}

// add new methods to String prototype
String.prototype.plus = function (other) {
  return addStrings(this, other)
}

String.prototype.minus = function (other) {
  return subtractStrings(this, other)
}

String.prototype.divide = function (other) {
  return divideStrings(this, other)
}

String.prototype.multiply = function (other) {
  return multiplyStrings(this, other)
}

const num1 = '371923791'
const num2 = '192871298'

console.log(num1.plus(num2))
console.log(num1.minus(num2))
console.log(num1.divide(num2))
console.log(num1.multiply(num2))
