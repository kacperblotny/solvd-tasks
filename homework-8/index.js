console.log()

// Book class represents a book in the bookstore with its attributes.
class Book {
  constructor(title, author, year, isbn, price, availability) {
    this.title = title
    this.author = author
    this.year = year
    this.isbn = isbn
    this.price = price
    this.availability = availability
  }
}

// User class represents a user of the bookstore.
class User {
  constructor(name, email, userId) {
    this.name = name
    this.email = email
    this.userId = this.generateUserId() // Method for generating a unique user ID
  }

  // Method to generate a unique user ID.
  generateUserId() {
    return Math.random().toString(36).substr(2, 8) // Generate a random alphanumeric string
  }
}

// Cart class represents a user's cart containing selected books.
class Cart {
  constructor(user) {
    this.user = user // Owner of the cart
    this.books = [] // Array to store books in the cart
  }

  // Method to add a book to the cart.
  addBooks(book) {
    // Condition to determing the millenium of book release
    if (book.year < 2000) {
      console.log(
        `2nd millennium book ${book.title} added to ${this.user.name}'s cart`
      )
    } else {
      console.log(
        `3rd millennium book ${book.title} added to ${this.user.name}'s cart`
      )
    }
    this.books.push(book)
  }

  // Method to remove a book from the cart based on its title.
  removeBooks(bookTitle) {
    const index = this.books.findIndex((book) => book.title === bookTitle)

    if (index !== -1) {
      const removedBook = this.books.splice(index, 1)[0]
      console.log(`Removed ${removedBook.title} from ${this.user.name}'s cart`)
    } else {
      console.log(`${bookTitle} is not in ${this.user.name}'s cart`)
    }
  }

  // Method to calculate the total price of the books in the cart.
  cartTotal() {
    let total = 0
    for (const book of this.books) {
      total += book.price
    }
    return total
  }
}

// Order class to place an order based on cart
class Order {
  constructor(cart) {
    this.user = cart.user // User associated with the order
    this.books = cart.books // Books in the cart trasnfered to order
    this.cart = cart // Access cart to use cart's methods
  }

  // Method to place an order.
  placeOrder() {
    if (this.books.length === 0) {
      console.log('Cart is empty. Cannot place order.')
      return
    }

    // Calculate total price, access Cart methods from Order
    let totalPrice = this.cart.cartTotal()
    console.log(
      `${this.user.name} placed an order with total price: $${totalPrice}`
    )

    this.cart = []
  }
}

// Example users
let user1 = new User('John', 'John@gmail.com')
let user2 = new User('Kate', 'Kate@gmail.com')
let user3 = new User('Jane', 'Jane@gmail.com')

// Example books
let book1 = new Book(
  'The Little Prince',
  'A de S-E',
  '2015',
  '74937189',
  20,
  true
)
let book2 = new Book(
  'Harry Potter',
  'J. K. Rowling',
  '2002',
  '56107485',
  40,
  true
)
let book3 = new Book(
  'The Hobbit',
  'J. R. R. Tolkien',
  '1937',
  '29138467',
  50,
  true
)

// Example carts
const cartUser1 = new Cart(user1)
const cartUser2 = new Cart(user2)

// Example user interaction with cart
cartUser1.addBooks(book1)
cartUser1.addBooks(book2)
cartUser1.addBooks(book3)
cartUser1.removeBooks('The Hobbit')

console.log(cartUser1.cartTotal())

// Example order
const order1 = new Order(cartUser1)
const order2 = new Order(cartUser2)

order1.placeOrder()
order2.placeOrder()

console.log()
