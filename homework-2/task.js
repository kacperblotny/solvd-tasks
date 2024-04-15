const dataTransformer = {
  addValues: (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b
    } else if (typeof a === 'string' && typeof b === 'string') {
      return a + b
    } else {
      return 'Addition not possible for the given types.'
    }
  },
  stringifyValue: (value) => {
    if (typeof value === 'object' || Array.isArray(value)) {
      return JSON.stringify(value)
    } else {
      return String(value)
    }
  },
  invertBoolean: (value) => {
    if (typeof value !== 'boolean') {
      return 'Expected a boolean argument.'
    }
    return !value
  },
  convertToNumber: (value) => {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value)
      if (!isNaN(parsedValue)) {
        return parsedValue
      }
    } else if (typeof value === 'boolean') {
      return value ? 1 : 0
    } else if (!isNaN(value)) {
      return Number(value)
    }
    return 'Conversion to number not possible.'
  },
  coerceToType: (value, type) => {
    switch (type) {
      case 'string':
        return dataTransformer.stringifyValue(value)
      case 'number':
        return dataTransformer.convertToNumber(value)
      case 'boolean':
        if (typeof value === 'boolean') {
          return value
        } else if (value.toLowerCase() === 'true') {
          return true
        } else if (value.toLowerCase() === 'false') {
          return false
        } else {
          return 'Conversion to boolean not possible.'
        }
      default:
        return 'Unsupported type.'
    }
  },
}

// Tests

console.log('Add values')
console.log(dataTransformer.addValues(5, 3)) // Output: 8
console.log(dataTransformer.addValues('5', '3')) // Output: 53
console.log(dataTransformer.addValues(5, '3'), '\n') // Output: error

console.log('Stringify value')
console.log(dataTransformer.stringifyValue({ name: 'John', age: 30 })) // Output: '{"name":"John","age":30}'
console.log(dataTransformer.stringifyValue(true)) // Output: true
console.log(dataTransformer.stringifyValue(2) + '\n') // Output: 2

console.log('Invert boolean')
console.log(dataTransformer.invertBoolean(true)) // Output: false
console.log(dataTransformer.invertBoolean(false)) // Output: true
console.log(dataTransformer.invertBoolean(1) + '\n') // Output: error

console.log('Convert to number')
console.log(dataTransformer.convertToNumber('15')) // Output: 15
console.log(dataTransformer.convertToNumber([1]) + '\n') // Output: 1

console.log('Coerce to type')
console.log(dataTransformer.coerceToType('123', 'number')) // Output: 123
console.log(dataTransformer.coerceToType(123, 'string')) // Output: 123
console.log(dataTransformer.coerceToType('true', 'boolean') + '\n') // Output: true
