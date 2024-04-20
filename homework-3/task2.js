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
  return students.map((student) => {
    const averageGrade =
      student.grades.reduce((acc, grade) => acc + grade, 0) /
      student.grades.length
    return { name: student.name, averageGrade }
  })
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
