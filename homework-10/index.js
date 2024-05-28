function customHash(str) {
  // prime number used for hashing
  const prime = 31
  // large prime number for modulus to avoid overflow
  const mod = 1e9 + 9
  let hash = 0

  // iterate through each character in the string
  for (let i = 0; i < str.length; i++) {
    // calculate hash
    hash = (hash * prime + str.charCodeAt(i)) % mod
  }

  return hash
}

class HashTable {
  constructor(size = 100) {
    // size of the hash table
    this.size = size
    // initialize buckets as an array of arrays (acting as linked lists)
    this.buckets = Array(size)
      .fill(null)
      .map(() => [])
  }

  // hash function to map keys to bucket indices
  _hash(key) {
    return customHash(key) % this.size
  }

  // insert key-value pair into the hash table
  insert(key, value) {
    const index = this._hash(key)
    const bucket = this.buckets[index]

    // check if key already exists and update the value
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // update value if key already exists
        bucket[i][1] = value
        return
      }
    }

    // if key doesn't exist, add a new entry
    bucket.push([key, value])
  }

  // retrieve value by key from the hash table
  get(key) {
    const index = this._hash(key)
    const bucket = this.buckets[index]

    // iterate through bucket to find the key
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // return the value if key is found
        return bucket[i][1]
      }
    }

    return undefined // return undefined if key is not found
  }

  // delete a key-value pair from the hash table
  delete(key) {
    const index = this._hash(key)
    const bucket = this.buckets[index]

    // iterate through bucket to find the key
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // remove key-value pair if key is found
        bucket.splice(i, 1)
        return true // return true to indicate successful deletion
      }
    }

    return false // return false if key is not found
  }
}

// example usage
const hashTable = new HashTable()

// insertion
hashTable.insert('name', 'Alice')
hashTable.insert('age', 30)
hashTable.insert('location', 'Wonderland')

// retrieval
console.log(hashTable.get('name')) // Alice
console.log(hashTable.get('age')) // 30
console.log(hashTable.get('location')) // Wonderland

// deletion
hashTable.delete('age')
console.log(hashTable.get('age')) // undefined

// test handling collisions
hashTable.insert('abc', 'first') // bucket collision
hashTable.insert('bca', 'second')

// Custom Hash Function:
//  - This function takes a string as input and generates a hash value for that string.
//  - It iterates through each character of the string, updating the hash value using a polynomial rolling hash technique.
//  - The hash value is calculated using the formula (hash * prime + charCode) % mod, where prime and mod are constants chosen to avoid collisions and overflow.

// Custom Hash Function
//  Time Complexity: O(n)), where n is the length of the input string.

// Hash Table:
// Insertion, Retrieval, Deletion with an average case of O(1) and worst one O(n) for potential collision

// Trade-offs:
// - Memory Usage: Each bucket uses additional memory for the linked list pointers.
// - Performance Degradation: If many elements hash to the same bucket, performance can degrade. However, with a well-designed hash function and adequate initial table size, this is minimized.
