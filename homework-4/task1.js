const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
}

Object.keys(person).forEach((key) => {
  Object.defineProperty(person, key, {
    writable: false,
    configurable: false,
  })
})

// In order to work change writable to true in configuration above
Object.defineProperty(person, 'updateInfo', {
  value: function (newInfo) {
    Object.keys(newInfo).forEach((key) => {
      if (this.hasOwnProperty(key)) {
        this[key] = newInfo[key]
      }
    })
  },
})

Object.defineProperty(person, 'address', {
  value: {},
  configurable: false,
  enumerable: false,
})

// testing
console.log(person)

// In order to work change writable to true in configuration above
person.updateInfo({ firstName: 'Jane', age: 32 })

// check if address exists on person
console.log(person.address)

// alternative way using getOwnPropertyDescriptor to see if address exists on person
const addressDescriptor = Object.getOwnPropertyDescriptor(person, 'address')
console.log(addressDescriptor)
