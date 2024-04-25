const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("foo")).toEqual(
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    );
  });

  // describe("cryptoHash()", () => {
  it("produces the same hash with the same input arguments in any order", () => {
    const hash1 = cryptoHash("one", "two", "three");
    const hash2 = cryptoHash("three", "one", "two");
    expect(hash1).toEqual(hash2);
  });
});

//   it("produces the same hash with the same input arguments in ant order", () => {
//     expect(cryptoHash("one", "two", "three").toEqual("three", "one", "two"));
//   });
// });
