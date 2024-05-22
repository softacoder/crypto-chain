// const Transaction = require("./transaction");
// const Wallet = require("../index");
// const { verifySignature } = require("../util");
// const { REWARD_INPUT, MINING_REWARD } = require("../config");

// describe("Transaction", () => {
//   let transaction, senderWallet, recipient, amount;

//   beforeEach(() => {
//     senderWallet = new Wallet();
//     recipient = "recipient-public-key";
//     amount = 50;
//     transaction = new Transaction({ senderWallet, recipient, amount });
//   });

//   it("has an `id`", () => {
//     expect(transaction).toHaveProperty("id");
//   });

//   describe("outMap", () => {
//     it("has an `outputMap`", () => {
//       expect(transaction).toHaveProperty("outputMap");
//     });

//     it("outputs the amount to the recipient", () => {
//       expect(transaction.outputMap[recipient]).toEqual(amount);
//     });

//     it("outputs the remaining balance for the `senderWallet`", () => {
//       expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
//         senderWallet.balance - amount
//       );
//     });
//   });

//   describe("input", () => {
//     it("has an `input`", () => {
//       expect(transaction).toHaveProperty("input");
//     });

//     it("has a `timestamp` in the input", () => {});

//     it("sets the `amount` to the `senderWallet` balance", () => {
//       expect(transaction.input.amount).toEqual(senderWallet.balance);
//     });

//     it("sets the `address` to the `senderWallet` publicKey", () => {
//       expect(transaction.input.address).toEqual(senderWallet.publicKey);
//     });

//     it("signs the input", () => {
//       expect(
//         verifySignature({
//           publicKey: senderWallet.publicKey,
//           data: transaction.outputMap,
//           signature: transaction.input.signature,
//         })
//       ).toBe(true);
//     });
//   });

//   describe("validTransaction()", () => {
//     let errorMock;

//     beforeEach(() => {
//       errorMock = jest.fn();

//       global.console.error = errorMock;
//     });
//     describe("when the transaction is valid", () => {
//       it("returns true", () => {
//         expect(Transaction.validTransaction(transaction)).toBe(true);
//       });
//     });

//     describe("when the transaction is invalid", () => {
//       describe("and a transaction outputMap value is invalid", () => {
//         it("returns false and logs an error", () => {
//           transaction.input.signature = new Wallet().sign("data");

//           expect(Transaction.validTransaction(transaction)).toBe(false);
//           expect(errorMock).toHaveBeenCalled();
//         });
//       });

//       describe("and the transaction input signature is invalid", () => {
//         it("returns false and logs an error", () => {
//           transaction.inputSignature[senderWallet.publicKey] = expect(
//             Transaction.validTransaction(transaction)
//           ).toBe(false);
//           expect(errorMock).toHaveBeenCalled();
//         });
//       });
//     });
//   });

//   describe("update()", () => {
//     let originalSignature, originalSenderOutput, nextRecipient, nextAmount;

//     describe("and the amount is invalid", () => {
//       it("throws an error", () => {
//         expect(() => {
//           transaction.update({
//             senderWallet,
//             recipient: "foo",
//             amount: 999999,
//           });
//         }).toThrow("Amount exceeds balance");
//       });
//     });

//     describe("and the amount is valid", () => {
//       beforeEach(() => {
//         originalSignature = transaction.input.signature;
//         originalSenderOutput = transaction.outputMap[senderWallet.publicKey];
//         nextRecipient = "next-recipient";
//         nextAmount = 50;

//         transaction.update({
//           senderWallet,
//           recipient: nextRecipient,
//           amount: nextAmount,
//         });
//       });

//       it("outputs the amount to the next recipient", () => {
//         expect(transaction.outputMap[nextRecipient]).toEqual(nextAmount);
//       });

//       it("subtracts the amount from the original sender output amount", () => {
//         expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
//           originalSenderOutput - nextAmount
//         );
//       });

//       it("maintains a total output that matches the input amount", () => {
//         expect(
//           Object.values(transaction.outputMap).reduce(
//             (total, outputAmount) => total + outputAmount
//           )
//         ).toEqual(transaction.input.amount);
//       });

//       it("re-signs the transaction", () => {
//         expect(transaction.input.signature).not.toEqual(originalSignature);
//       });

//       describe("and another update for the same recipient", () => {
//         let addedAmount;

//         beforeEach(() => {
//           addedAmount = 80;
//           transaction.update({
//             senderWallet,
//             recipient: nextRecipient,
//             amount: addedAmount,
//           });
//         });

//         it("adds to the recipient amount", () => {
//           expect(transaction.outputMap[nextRecipient]).toEqual(
//             nextAmount + addedAmount
//           );
//         });

//         it("subtracts the amount from the original sender output amount", () => {
//           expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
//             originalSenderOutput - nextAmount - addedAmount
//           );
//         });
//       });
//     });
//   });

//   describe("rewardTransaction()", () => {
//     let rewardTransaction, minerWallet;

//     beforeEach(() => {
//       minerWallet = new MinerWallet();
//       rewardTransaction = Transaction.rewardTransaction({ minerWallet });
//     });

//     it("creates a transaction with the reward input", () => {
//       expect(rewardTransaction.input).toEqual(REWARD_INPUT);
//     });

//     it("creates ones transaction for the miner with the `MINING_REWARD`", () => {
//       expect(rewardTransaction.outputMap[minerWallet.publicKey]).toEqual(
//         MINING_REWARD
//       );
//     });
//   });
// });

const TransactionPool = require("./transaction-pool");
const Transaction = require("./transaction");
const Wallet = require("./index");
const Blockchain = require("../blockchain");

describe("TransactionPool", () => {
  let transactionPool, transaction, senderWallet;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    senderWallet = new Wallet();
    transaction = new Transaction({
      senderWallet,
      recipient: "fake-recipient",
      amount: 50,
    });
  });

  describe("setTransaction()", () => {
    it("adds a transaction", () => {
      transactionPool.setTransaction(transaction);

      expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });
  });

  describe("existingTransaction()", () => {
    it("returns an existing transaction given an input address", () => {
      transactionPool.setTransaction(transaction);

      expect(
        transactionPool.existingTransaction({
          inputAddress: senderWallet.publicKey,
        })
      ).toBe(transaction);
    });
  });

  describe("validTransactions()", () => {
    let validTransactions, errorMock;

    beforeEach(() => {
      validTransactions = [];
      errorMock = jest.fn();
      global.console.error = errorMock;

      for (let i = 0; i < 10; i++) {
        transaction = new Transaction({
          senderWallet,
          recipient: "any-recipient",
          amount: 30,
        });

        if (i % 3 === 0) {
          transaction.input.amount = 999999;
        } else if (i % 3 === 1) {
          transaction.input.signature = new Wallet().sign("foo");
        } else {
          validTransactions.push(transaction);
        }

        transactionPool.setTransaction(transaction);
      }
    });

    it("returns valid transaction", () => {
      expect(transactionPool.validTransactions()).toEqual(validTransactions);
    });

    it("logs errors for the invalid transactions", () => {
      transactionPool.validTransactions();
      expect(errorMock).toHaveBeenCalled();
    });
  });

  describe("clear()", () => {
    it("clears the transactions", () => {
      transactionPool.clear();

      expect(transactionPool.transactionMap).toEqual({});
    });
  });

  describe("clearBlockchainTransactions()", () => {
    it("clears the pool of any existing blockchain transactions", () => {
      const blockchain = new Blockchain();
      const expectedTransactionMap = {};

      for (let i = 0; i < 6; i++) {
        const transaction = new Wallet().createTransaction({
          recipient: "foo",
          amount: 20,
        });

        transactionPool.setTransaction(transaction);

        if (i % 2 === 0) {
          blockchain.addBlock({ data: [transaction] });
        } else {
          expectedTransactionMap[transaction.id] = transaction;
        }
      }

      transactionPool.clearBlockchainTransactions({ chain: blockchain.chain });

      expect(transactionPool.transactionMap).toEqual(expectedTransactionMap);
    });
  });
});
