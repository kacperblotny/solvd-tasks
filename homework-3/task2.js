function getFullName(person) {
  return `${person.firstName} ${person.lastName}`
}

function filterUniqueWords(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter((word, index, array) => array.indexOf(word) === index)
    .sort()
}

function getAverageGrade(students) {
  const allGrades = students.map((student) => student.grades).flat()

  return Number(
    (
      allGrades.reduce((total, grade) => total + grade, 0) / allGrades.length
    ).toFixed(2)
  )
}

// testing
const person = {
  firstName: 'Kacper',
  lastName: 'Blotny',
}

const text = 'Sample text with repeated words to sample repeated text'

const students = [
  { name: 'Kacper', grades: [5, 3, 4] },
  { name: 'Alex', grades: [2, 3, 3] },
  { name: 'John', grades: [3, 4, 1] },
]

console.log(getFullName(person))
console.log(filterUniqueWords(text))
console.log(getAverageGrade(students))
