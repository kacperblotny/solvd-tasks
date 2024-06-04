function myJSONParse(jsonString) {
  // we start at the very beggining of given string
  let index = 0

  // fnc to skip whitespace characters
  function skipWhitespace() {
    // if any whitespace eg. newline, tab, and carriage return, exists move index by one
    while (
      jsonString[index] === ' ' ||
      jsonString[index] === '\n' ||
      jsonString[index] === '\t' ||
      jsonString[index] === '\r'
    ) {
      index++
    }
  }

  // parse a string from between ""
  // used for keys and values
  function parseString() {
    // if it doesn't start with ", throw an error, fnc fired incorrectly
    if (jsonString[index] !== '"') {
      throw new SyntaxError(
        'Expected string starting with " at position ' + index
      )
    }
    // innitiate startindex for slice fnc
    let startIndex = ++index
    while (jsonString[index] !== '"') {
      // escape sequences
      if (jsonString[index] === '\\') {
        index++
      }
      index++
      // make sure its not missing a closing char "
      if (index >= jsonString.length) {
        throw new SyntaxError('Unterminated string at position ' + startIndex)
      }
    }
    // return a string from between ""
    return jsonString.slice(startIndex, index++)
  }

  // fnc to parse a number
  function parseNumber() {
    // innitiate startindex for slice fnc
    let startIndex = index
    // keep testing this regex expression and itterating jsonString with index
    // this expression makes sure we can handle really large numbers as well as negative values
    while (/[0-9.eE+-]/.test(jsonString[index])) {
      index++
    }
    let numberString = jsonString.slice(startIndex, index)
    // string to number
    let number = parseFloat(numberString)
    // final check if converting was successful
    if (isNaN(number)) {
      throw new SyntaxError(
        'Invalid number syntax: ' + numberString + ' at position ' + startIndex
      )
    }
    // return a number value
    return number
  }

  // fnc to parse an array
  function parseArray() {
    // initiate an empty array that we are going to seed and reutrn
    let result = []
    // we fired it because we detected a [, so now we skip it
    index++
    skipWhitespace()
    // as long as we don't reach the end of array keep iterating
    while (jsonString[index] !== ']') {
      // check what kind of type is the first element of array
      // here if it happens to be another array we deal with it recursively
      result.push(parseValue())
      // after each element we check for white spaces
      skipWhitespace()
      // if we correctly caught a type in the previous step we make sure we come across a comma to seperate values
      if (jsonString[index] === ',') {
        // skip ,
        index++
        // skip whitespace
        skipWhitespace()
      } else if (jsonString[index] !== ']') {
        // throw an error because we didn't find next element or end of array
        throw new SyntaxError('Expected "," or "]" at position ' + index)
      }
    }
    // while loop finished because we found ], skip ] and return an array
    index++
    return result
  }

  // fnc to parse an object
  function parseObject() {
    // initiate an empty object that we are going to seed and reutrn
    let result = {}
    // we fired it because we detected a {, so now we skip it
    index++
    skipWhitespace()
    // as long as we don't reach the end of the object keep iterating
    while (jsonString[index] !== '}') {
      // we found an object, so the first element after removing white spaces must be an string because its a key and keys must be contained in "", eles it will not find a string an throw an error from inside my parseString() fnc
      let key = parseString()
      skipWhitespace()
      // after a key we expect a : for valid json syntax
      if (jsonString[index] !== ':') {
        throw new SyntaxError(
          'Expected ":" after property name at position ' + index
        )
      }
      // previous if statement didn't fire so we are sure there is : and we skip it
      index++
      // make sure no white spaces occur
      skipWhitespace()
      // whitespaces are gone so next we should have the value, check what type it is, if it happens to be an object nested inside current object we deal with it recursively
      let value = parseValue()
      // we make key value pairs
      result[key] = value
      skipWhitespace()
      // look for comma to get next value
      if (jsonString[index] === ',') {
        // found comma so skip it
        index++
        skipWhitespace()
      } else if (jsonString[index] !== '}') {
        // we didn't find comma for next value and didn't find closing tag for object }, so we throw an error for invalid syntax
        throw new SyntaxError('Expected "," or "}" at position ' + index)
      }
    }
    // while loop failed so we skip the closing tag of an object }
    index++

    return result
  }

  // fnc to parse a value
  // here is where we tokenize our values and identify what type they are
  function parseValue() {
    // make sure no white spaces interrupt
    skipWhitespace()
    // get current char we are going to work with
    let currentChar = jsonString[index]
    if (currentChar === '"') {
      // if it is " we know it's going to be a string, we are also going to use parseString to validate if keys are in correct syntax
      return parseString()
    } else if (/[0-9-]/.test(currentChar)) {
      // check if it is any character from 0-9 and if it is a minus for negative numbers
      return parseNumber()
    } else if (currentChar === '[') {
      // check if its an array
      return parseArray()
    } else if (currentChar === '{') {
      // check if its an object
      return parseObject()
      // in this next 3 cases we don't need to use regex we just check if they are equal to the string; true,false,null
      // we got to this place because if statment checking for " already failed so we know its not going to be a string but its own type (bolean, null)
    } else if (jsonString.substr(index, 4) === 'true') {
      index += 4
      return true
    } else if (jsonString.substr(index, 5) === 'false') {
      index += 5
      return false
    } else if (jsonString.substr(index, 4) === 'null') {
      index += 4
      return null
    } else {
      // if none of the above statments succeded we are having a invalid syntax
      throw new SyntaxError('Unexpected token at position ' + index)
    }
  }

  // start parsing
  try {
    return parseValue()
  } catch (error) {
    throw error
  }
}

// testing
const testCases = [
  '{"name": "John", "age": 30, "city": "New York"}',
  '[{"name": "John"}, {"name": "Alice"}]',
  'true',
  'false',
  'null',
  '{"nested": {"a": 1, "b": [false, null, "string"]}}',
  '{"nested": {"a": 1, "b": [false, null, "string", [true, false]]}}',
]

testCases.forEach((test, index) => {
  try {
    console.log(`Test Case ${index + 1}:`, myJSONParse(test))
  } catch (e) {
    console.error(`Test Case ${index + 1} Error:`, e.message)
  }
})

// Reflections
// This exercise helped me dive really deep into the basic logic behind something like a regular json parse, it really helped to understand how it work and make my self comfortable in even trying to understand this type of functions
// Regex was really usefull in this type of operations, I could easly tell it to look only for numbers without making some weird loops and checking the type of each element or some other ways
// Regex is really fun to use, to my luck I had some experience with it from scrapping web pages, but this project also helped me to dive deep into whitespaces and escape characters in strings
// I think the most significant task I thought I would face was all the nested structures but I quickly came with a solution using recursive approach which made it really easy and simple to deal with nesting
// Another tricky problem was making sure I handle all the errors correctly, improperly formatted JSON must be detected and reported accurately, unfortunetly there is a lot of ways a JSON can be formatted incorrectly, I tried to recreate as many invalid scenarios as possible and I think I managed to
