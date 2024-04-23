function deepCloneObject(obj, clonedObjects = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj)
  }

  let cloned
  if (Array.isArray(obj)) {
    cloned = []
  } else {
    cloned = Object.create(Object.getPrototypeOf(obj))
  }

  clonedObjects.set(obj, cloned)

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepCloneObject(obj[key], clonedObjects)
    }
  }

  return cloned
}

const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
  hobbies: {
    indoor: 'programming',
    outdoor: ['hiking', 'skiing'],
  },
}

// test for circular reference
person.clone = person
console.log(person)

const deepClonedPerson = deepCloneObject(person)
console.log(deepClonedPerson)
