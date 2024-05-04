class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  setTransactionMap(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }
}
module.exports = TransactionPool;
