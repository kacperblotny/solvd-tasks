function getArrayIntersection(arr1, arr2) {
  const set = new Set(arr1)
  const intersection = arr2.filter((item) => set.has(item))

  return [...new Set(intersection)]
}

function getUniqueElements(arr) {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === self.lastIndexOf(value)
  })
}

function getArrayUnion(arr1, arr2) {
  const unique1 = getUniqueElements(arr1)
  const unique2 = getUniqueElements(arr2)

  let combinedUnique = getUniqueElements([...unique1, ...unique2])
  return getUniqueElements(combinedUnique)
}

const arr1 = [1, 1, 2, 3, 4, 7, 6, 1]
const arr2 = [1, 8, 1, 2, 9, 8, 7, 10]

const intersection = getArrayIntersection(arr1, arr2)
console.log(intersection)

const unified = getArrayUnion(arr1, arr2)
console.log(unified)
