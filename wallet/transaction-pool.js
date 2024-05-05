class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  setTransactionMap(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  existingTransaction({ inputAddress }) {
    const transaction = Object.values(this.transactionMap);

    return transactions.find(
      (transaction) => transaction.input.address === inputAddress
    );
  }
}
module.exports = TransactionPool;
