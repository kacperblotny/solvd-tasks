function customFilterUnique(array, callback) {
  const uniqueValues = []

  array.forEach((item) => {
    if (!uniqueValues.some((uniqueItem) => callback(item, uniqueItem))) {
      uniqueValues.push(item)
    }
  })

  return uniqueValues
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

const unique = customFilterUnique(arr, isUnique)
console.log(unique)
