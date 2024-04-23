function validateObject(obj, schema) {
  for (let key in schema) {
    if (schema[key].required && !obj.hasOwnProperty(key)) {
      return false
    }
  }

  for (let key in obj) {
    if (schema[key]) {
      if (typeof obj[key] !== schema[key].type) {
        return false
      }

      // custom validation, string longer than 5
      if (schema[key].validate) {
        if (!schema[key].validate(obj[key])) {
          return false
        }
      }
    } else {
      // if given property is not in schema
      console.log(key)
      return false
    }
  }

  return true
}

// testing
const schema = {
  name: { type: 'string', required: true },
  age: { type: 'number', required: true },
  email: { type: 'string', required: false },
  isAdmin: { type: 'boolean', required: false },
  customValidation: {
    type: 'string',
    required: false,
    validate: (value) => value.length > 5, // custom validation rule
  },
}

const validObject = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  isAdmin: false,
  customValidation: 'abcdef',
}

const invalidObject = {
  name: 'Jane',
  age: '25', // age not a number
  email: 'jane@example.com', // not even required
  isAdmin: 'true', // isAdmin should be a boolean
  customValidation: 'abc', // not longer than 5
}

// valid object
console.log(validateObject(validObject, schema))

// invalid object
console.log(validateObject(invalidObject, schema))
