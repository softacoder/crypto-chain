// const crypto = require("crypto");

// const cryptoHash = (...inputs) => {
//   const hash = crypto.createHash("sha256");

//   hash.update(inputs.join(" "));

//   return hash.digest("hex");
// };

// module.exports = cryptoHash;

// const crypto = require("crypto");

// const cryptoHash = (...inputs) => {
//   const hash = crypto.createHash("sha256");

//   // Stringify each input and concatenate them without adding any separator
//   const inputString = inputs.map((input) => JSON.stringify(input)).join("");

//   hash.update(inputString);

//   return hash.digest("hex");
// };

// module.exports = cryptoHash;

// const crypto = require("crypto");

// const cryptoHash = (...inputs) => {
//   const hash = crypto.createHash("sha256");

//   // Concatenate all inputs as strings
//   const inputString = inputs.map((input) => JSON.stringify(input)).join("");

//   hash.update(inputString);

//   return hash.digest("hex");
// };

// module.exports = cryptoHash;

const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  // Concatenate all inputs as strings
  const inputString = inputs.map((input) => JSON.stringify(input)).join("");

  hash.update(inputString);

  return hash.digest("hex");
};

module.exports = cryptoHash;
