// double loop approach with additional array

function chunkArray(arr, chunk) {
  if (arr.length === 0 || chunk <= 0) {
    return []
  }

  let chunked = []
  for (let i = 0; i < arr.length / chunk; i++) {
    let helperArr = []
    for (let j = 0; j < chunk; j++) {
      helperArr.push(arr[chunk * i + j])
    }
    chunked.push(helperArr)
  }
  return chunked
}

// single loop single array approach
// function chunkArray(arr, chunk) {
//   if (arr.length === 0 || chunk <= 0) {
//     return []
//   }

//   const chunksNumber = Math.ceil(arr.length / chunk)
//   const result = []

//   for (let i = 0; i < chunksNumber; i++) {
//     const start = i * chunk
//     const end = start + chunk
//     result.push(arr.slice(start, end))
//   }

//   return result
// }

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const chunked = chunkArray(arr, 5)
console.log(chunked)
