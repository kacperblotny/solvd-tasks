function createImmutableObject(obj) {
  const isArray = Array.isArray(obj)
  const immutableObj = isArray ? [] : {}

  const keys = Object.keys(obj)

  keys.forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key)
    if (descriptor.value && typeof descriptor.value === 'object') {
      // handle recursively
      descriptor.value = createImmutableObject(descriptor.value)
    }

    descriptor.writable = false
    descriptor.configurable = false

    Object.defineProperty(immutableObj, key, descriptor)
  })

  return immutableObj
}

const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
  hobbies: ['Reading', 'Hiking', 'Programming'],
}

// testing
const immutablePerson = createImmutableObject(person)
immutablePerson.firstName = 'xxx'
immutablePerson.lastName = 'xxx'
immutablePerson.lastName = 'xxx'
immutablePerson.email = 'xxx'
immutablePerson.hobbies = ['x', 'y']
console.log(immutablePerson)
