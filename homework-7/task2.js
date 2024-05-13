function promiseAllSettled(promises) {
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
          results.push({
            status: 'fulfilled',
            value: result,
          })
          
          completedPromises++
          checkAllPromisesCompleted()
        })
        .catch((error) => {
          results.push({
            status: 'rejected',
            value: error,
          })

          completedPromises++
          checkAllPromisesCompleted()
        })
    })
  })
}

const promises = [
  Promise.resolve(1),
  Promise.reject('Error occurred'),
  Promise.resolve(3),
]

promiseAllSettled(promises).then((results) => {
  console.log('All promises settled:', results)
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
})
