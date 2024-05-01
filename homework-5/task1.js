function customFilterUnique(array, callback) {
  const uniqueArray = []
  const seen = new Set()

  array.forEach((item) => {
    const result = callback(item)
    const key = result instanceof Object ? JSON.stringify(result) : result // Convert objects to strings for comparison

    if (!seen.has(key) && typeof key != 'undefined') {
      seen.add(key)
      uniqueArray.push(item)
    }
  })

  return uniqueArray
  // const uniqueValues = []

  // array.forEach((item) => {
  //   if (!uniqueValues.some((uniqueItem) => callback(item, uniqueItem))) {
  //     uniqueValues.push(item)
  //   }
  // })

  // return uniqueValues
}

// callback for uniqie items/objects
function isUnique(current, existing) {
  // filter identical objects
  if (typeof current === 'object' && typeof existing === 'object') {
    return JSON.stringify(current) === JSON.stringify(existing)
  } else {
    // filter number or strings
    return current === existing
  }
}

// callback for unique name
function isUniqueName(current, existing) {
  return current.name === existing.name
}

// exmaple arrays

const arr = [1, 2, 3, 4, 5, 3, 5, 7, 3, 5, 1]

// const arr = [
//   { name: 'John', age: 25 },
//   { name: 'John', age: 25 },
//   { name: 'Bob', age: 30 },
//   { name: 'Kacper', age: 25 },
//   { name: 'John', age: 25 },
//   { name: 'John', age: 25 },
//   { name: 'Jane', age: 35 },
//   { name: 'Jane', age: 35 },
// ]
let arrayOfObjects = [
  { a: 1, b: 2 },
  { a: 1, b: 2 },
  { c: 3, d: 4 },
  { a: 5, b: 6 },
  { e: 7, f: 8 },
  { g: 9, h: 0 },
]
const filterByPropertyA = (obj) => {
  if (!obj || typeof obj !== 'object')
    throw new Error('pass an object as parameter')
  // if (Object.keys(obj).includes('a') ? obj : undefined) {
  //   console.log(Object.keys(obj))
  // }

  return Object.keys(obj).includes('a') ? obj : undefined
}

const uniqueTest = customFilterUnique(arrayOfObjects, filterByPropertyA)
console.log(uniqueTest)
