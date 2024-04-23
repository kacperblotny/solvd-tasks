const bankAccount = {
  _balance: 1000,

  get formattedBalance() {
    return '$' + this._balance
  },

  set balance(newBalance) {
    this._balance = newBalance
  },

  transfer(targetAccount, amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('Invalid amount for transfer.')
      return
    }
    if (this._balance < amount) {
      console.log('Insufficient funds for transfer.')
      return
    }
    this._balance -= amount
    targetAccount._balance += amount
  },
}

const anotherAccount = {
  _balance: 500,
  get formattedBalance() {
    return '$' + this._balance
  },

  set balance(newBalance) {
    this._balance = newBalance
  },
}

// testing
console.log('Before transfer:')
console.log('Bank Account balance:', bankAccount.formattedBalance)
console.log('Another Account balance:', anotherAccount.formattedBalance)

bankAccount.transfer(anotherAccount, 200)

console.log('After transfer:')
console.log('Bank Account balance:', bankAccount.formattedBalance)
console.log('Another Account balance:', anotherAccount.formattedBalance)
