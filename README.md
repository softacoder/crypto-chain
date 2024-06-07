# cryptochain

# this blockchain code is proof of work

# A backend + frontend with Node.js, Express, React, & more!

# https://codeyourfuture.udemy.com/course/build-blockchain-full-stack/learn/lecture/12610358#overview

# Please note this website with code is not deployed on Heroku to avoid costs. In the tutorial there is instructions hw to do this.

Code a full-on backend with test-driven development.
Write a full test suite for the backend.
Build a Blockchain in the object-oriented programming style.
Create a full frontend React.js web application.
Deploy the application to production (with multiple servers).
Create an API around the Blockchain.
Create a real-time connected peer-to-peer server with a pub/sub implementation.
Implement a proof-of-work algorithm.
Sign Transactions with cryptography and digital signature.
Create a Transaction Pool for a real-time list of incoming data.
Include transactions in core blocks of the chain.

Hey! Looking to extend this blockchain and cryptocurrency? Here are a handful of ideas that you can take on to make your version of cryptochain truly unique:

Download the Blockchain to the File System:

Currently, the blockchain completely lives in the JavaScript memory. Luckily, as long as there is one node in the system running, a copy of the current blockchain is stored. But if all nodes go down, the blockchain progress will die. One solution is to implement blockchain backups by adding a feature to download the blockchain to the file system. A straightforward option is to download the blockchain as json.

Load the Blockchain from the File System:

This follows up the previous challenge, which is to implement a feature where the blockchain can be downloaded from the file system. This challenge is to reload the blockchain in memory using an existing json file representing a chain. The benefit is quicker synchronization on startup for new peers, as well as restoring lost data if the JavaScript memory somehow loses the blockchain.

Transaction Pool Socket Updates:

Replace the polling logic in the transaction pool with real-time updates through socket.io. Continually polling the pool, even when there haven’t been any updates, could be overkill and eventually overload the server. But using socket.io for real-time updates is an alternate and more clean solution.

Refactor the React app to use Redux:

There are certain places in the application, where certain API requests are overdone. For example, the known-addresses, and wallet-info section are fetched on every component visit. But this can be fixed by redux which maintains an internal store. Plus, if the app has any logic where a smaller component needs to update global state, redux would definitely come in handy.

Fresh Keys Per Transaction:

This challenge is to implement a solution to a possible attack vector which tracks a public key’s usage throughout many transactions, and attempts to decrypt its private key. A solution to this, is to implement a wallet, that creates a fresh set of keys on every transactions. It’s a lot more overhead - but perhaps more secure.

Beef Up the Proof-of-Work and Display Mining Progress:

Beef up the proof-of-work algorithm by significantly increasing the MINING_RATE. Display real-time feedback of the proof-of-work algorithm in the frontend (socket.io could come in handy).

Permissioned Access:

Currently, anyone can visit the frontend so long as they know its public url. This means that anyone can issue a mining request on that frontend’s behalf. With permissioned access, only authorized users should be able to access a frontend, and call its api requests (every api should check for an encrypted authorization header).
