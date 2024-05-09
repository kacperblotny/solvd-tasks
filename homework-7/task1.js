function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = []
    let completedPromises = 0

    function checkAllPromisesCompleted() {
      if (completedPromises === promises.length) {
        resolve(results)
      }
    }

    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result
          completedPromises++
          checkAllPromisesCompleted()
        })
        .catch((error) => {
          reject(error)
        })
    })
  })
}

let failedPromise = new Promise((resolve, reject) => {
  let x = 1 + 2
  if (x === 2) {
    resolve('Success')
  } else {
    reject('Failed')
  }
})

const promises = [Promise.resolve(1), Promise.resolve(2), failedPromise]

promiseAll(promises)
  .then((results) => {
    console.log('All promises resolved:', results) // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error('At least one promise rejected:', error)
  })
