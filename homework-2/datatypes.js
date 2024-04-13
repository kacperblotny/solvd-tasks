let str = 'Hello'
typeof str // "string"

let num = 10
typeof num // "number"

let bool = true
typeof bool // "boolean"

let undef
typeof undef // "undefined"

let n = null
typeof n // "object" (This is a quirk of JavaScript, not the actual type)

let obj = { name: 'John', age: 30 }
typeof obj // "object"

let arr = [1, 2, 3]
Array.isArray(arr) // true

let func = function () {}
typeof func // "function"
