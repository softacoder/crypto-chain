const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("foo")).toEqual(
      "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
    );
  });

  it("produces the same hash with the same input arguments in ant order", () => {
    expect(cryptoHash("one", "two", "three").toEqual("three", "one", "two"));
  });
});

// describe("cryptoHash()", () => {
//   it("generates a SHA-256 hashed output", () => {
//     // Provide a valid input for the cryptoHash function
//     const validInput = "valid input";
//     expect(cryptoHash(validInput)).toEqual(
//       "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
//     );
//   });

//   it("produces the same hash with the same input arguments in any order", () => {
//     // Provide valid inputs for the cryptoHash function
//     const input1 = "one";
//     const input2 = "two";
//     const input3 = "three";
//     expect(cryptoHash(input1, input2, input3)).toEqual(
//       cryptoHash(input3, input1, input2)
//     );
//   });
// });
