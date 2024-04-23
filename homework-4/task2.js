const product = {
  name: 'Laptop',
  price: 1000,
  quantity: 5,
}

Object.defineProperties(product, {
  price: {
    value: product.price,
    writable: false,
    enumerable: false,
    //  configurable: false,
  },
  quantity: {
    value: product.quantity,
    writable: false,
    enumerable: false,
    //  configurable: false,
  },
})

function getTotalPrice(product) {
  const priceDesc = Object.getOwnPropertyDescriptor(product, 'price')
  const quantityDesc = Object.getOwnPropertyDescriptor(product, 'quantity')

  if (priceDesc && quantityDesc) {
    const price = priceDesc.value
    const quantity = quantityDesc.value

    return price * quantity
  } else {
    console.log('price or quantity does not exist')
    return null
  }
}

function deleteNonConfigurable(product, propName) {
  const descriptor = Object.getOwnPropertyDescriptor(product, propName)

  if (!product.hasOwnProperty(propName)) {
    console.log(`${propName} does not exist`)
    return
  }

  if (descriptor.configurable) {
    // log before deletion
    console.log(`${propName} accesible: ` + product[propName])

    delete product[propName]

    // log after deletion
    console.log(`${propName} inaccesible: ` + product[propName])
  } else {
    console.log(`${propName}is not configurable`)
  }
}

//testing
console.log(getTotalPrice(product))
deleteNonConfigurable(product, 'price')
