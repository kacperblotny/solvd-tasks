function calculateDiscountedPrice(products, discount) {
  if (discount > 100 || discount < 0) {
    return 'Please keep the discount in the range of 0 - 100%'
  } else {
    const discountedProducts = products.map((product) => {
      const discountedPrice = product.price * (1 - discount / 100)

      return {
        ...product,
        price: discountedPrice,
      }
    })

    return discountedProducts
  }
}

function calculateTotalPrice(products) {
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price
  }, 0)

  return totalPrice
}

// testing
const products = [
  { name: 'Product 1', price: 150 },
  { name: 'Product 2', price: 50 },
  { name: 'Product 3', price: 30 },
]
console.log(calculateDiscountedPrice(products, 100))
console.log(calculateTotalPrice(products))
