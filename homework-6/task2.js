function highlightKeywords(template, keywords) {
  return keywords.reduce((acc, keyword, index) => {
    const regex = new RegExp(`\\$\\{${index}\\}`)

    return acc.replace(regex, `<span class="highlighted">${keyword}</span>`)
  }, template)
}

const keywords = ['JavaScript', 'template', 'tagged']
const template =
  'Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.'

const highlighted = highlightKeywords(template, keywords)

console.log(highlighted)
