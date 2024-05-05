function multiline(strings, ...values) {
  const combined = strings.reduce(
    (acc, str, i) => acc + str + (values[i] || ''),
    ''
  )
  const lines = combined.split('\n')

  // to fix the \` syntax not working for me, remove first and last elemnt ''
  lines.shift()
  lines.pop()

  const numberedLines = lines.map((line, index) => {
    const lineNumber = index + 1
    // Preserve original indentation by matching leading spaces or tabs
    const indentation = line.match(/^\s*/)[0]
    return `${lineNumber} ${line.replace(/^\s*/, indentation)}`
  })

  return numberedLines.join('\n')
}

const code = multiline`
function add(a, b) {
return a + b;
}
`

console.log(code)
