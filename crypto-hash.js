const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  // Concatenate all inputs as strings
  // const inputString = inputs.map((input) => JSON.stringify(input)).join("");

  hash.update(inputs.sort());

  return hash.digest("hex");
};

module.exports = cryptoHash;
