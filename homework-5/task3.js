function customShuffle(arr) {
  let schuffledArray = [...arr]

  for (let i = 0; i < schuffledArray.length; i++) {
    const getRandom = Math.floor(Math.random() * schuffledArray.length)
    let helper = schuffledArray[i]
    schuffledArray[i] = schuffledArray[getRandom]
    schuffledArray[getRandom] = helper
  }

  return schuffledArray
}

function fisherYates(arr) {
  const shuffledArray = [...arr]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}

// testing
const arr = [1, 2, 3, 4, 5, 6]

const shuffledCustom = customShuffle(arr)
console.log(shuffledCustom)

const shufledFisherYates = fisherYates(arr)
console.log(shufledFisherYates)
