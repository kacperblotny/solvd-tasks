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
        return String(value)
      case 'number':
        return dataTransformer.convertToNumber(value)
      case 'boolean':
        if (typeof value === 'boolean') {
          return value
        } else {
          return 'Conversion to boolean not possible.'
        }
      default:
        return 'Unsupported type.'
    }
  },

  // Additional function: check if a value is numeric
  isNumeric: (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value)
  },

  // Additional function: safely convert to integer
  toInteger: (value) => {
    if (dataTransformer.isNumeric(value)) {
      return parseInt(value, 10)
    }
    return 'Conversion to integer not possible.'
  },
}

// Example usage:
console.log(dataTransformer.addValues(5, 3)) // Output: 8
console.log(dataTransformer.addValues('Hello', ' World')) // Output: 'Hello World'
console.log(dataTransformer.stringifyValue({ name: 'John', age: 30 })) // Output: '{"name":"John","age":30}'
console.log(dataTransformer.invertBoolean(true)) // Output: false
console.log(dataTransformer.convertToNumber('42')) // Output: 42
console.log(dataTransformer.coerceToType('true', 'boolean')) // Output: true
console.log(dataTransformer.isNumeric('123')) // Output: true
console.log(dataTransformer.toInteger('42')) // Output: 42
