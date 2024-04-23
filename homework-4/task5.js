function observeObject(obj, callback) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      console.log(`Property "${prop}" accessed`)
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      console.log(`Property "${prop}" set to ${value}`)
      callback(prop, value) // Invoke the callback function
      return Reflect.set(target, prop, value, receiver)
    },
  })
}

const callback = (prop, value) => {
  console.log(`Callback: Property "${prop}" modified to ${value}`)
}

const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
}

const observedPerson = observeObject(person, callback)
console.log(observedPerson.firstName)
observedPerson.age = 31
