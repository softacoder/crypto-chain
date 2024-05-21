// const redis = require("redis");

// const CHANNELS = {
//   TEST: "TEST",
//   BLOCKCHAIN: "BLOCKCHAIN",
//   TRANSACTION: "TRANSACTION",
// };

// class PubSub {
//   constructor({ blockchain, transactionPool, redisUrl }) {
//     this.blockchain = blockchain;
//     this.transactionPool = transactionPool;

//     this.publisher = redis.createClient();
//     this.subscriber = redis.createClient();

//     this.subscribeToChannels();

//     this.subscriber.on("message", (channel, message) =>
//       this.handleMessage(channel, message)
//     );
//   }

//   handleMessage(channel, message) {
//     console.log(`Message received. Channel: ${channel}. Message: ${message}.`);

//     const parsedMessage = JSON.parse(message);

//     switch (channel) {
//       case CHANNELS.BLOCKCHAIN:
//         this.blockchain.replaceChain(parsedMessage, true, () => {
//           this.transactionPool.clearBlockchainTransactions({
//             chain: parsedMessage,
//           });
//         });
//         break;
//       case CHANNELS.TRANSACTION:
//         this.transaction.replaceTransaction(parsedMessage);
//         break;
//       default:
//         return;
//     }
//   }

//   subscribeToChannels() {
//     Object.values(CHANNELS).forEach((channel) => {
//       this.subscriber.subscribe(channel);
//     });
//   }

//   publish({ channel, message }) {
//     this.subscriber.unsubscribe(channel, () => {
//       this.publisher.publish(channel, message, () => {
//         this.subscriber.subscribe(channel);
//       });
//     });
//   }

//   broadcastChain() {
//     this.publish({
//       channel: CHANNELS.BLOCKCHAIN,
//       message: JSON.stringify(this.blockchain.chain),
//     });
//   }

//   broadcastTransaction(transaction) {
//     this.publish({
//       channel: CHANNELS.TRANSACTION,
//       message: JSON.stringify(transaction),
//     });
//   }
// }

// module.exports = PubSub;

const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-ce2e6a01-0dd0-4b1d-a63d-d97f66f33609",
  subscribeKey: "sub-c-2f195dcd-8434-4696-8852-59ad66e8b06d",
  secretKey: "sec-c-NTg3MWIyZTItOWI5Yi00YTIxLWI3N2MtMmI3ZDg3ZGRkMzVk",
};

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
  TRANSACTION: "TRANSACTION",
};

class PubSub {
  constructor({ blockchain, transactionPool }) {
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);
    const parsedMessage = JSON.parse(message);
    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, true, () => {
          this.transactionPool.clearBlockchainTransactions({
            chain: parsedMessage,
          });
        });
        break;
      case CHANNELS.TRANSACTION:
        this.transactionPool.setTransaction(parsedMessage);
        break;
      default:
        return;
    }
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;

        this.handleMessage(channel, message);
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}
module.exports = PubSub;
