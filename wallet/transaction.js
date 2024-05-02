const uuid = require("uuid/v1");

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid();
    this.outputMap = this.outputMap({ senderWallet, recipient, amount });
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {};

    output[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

    return outputMap;
  }
}

module.exports = Transaction;
