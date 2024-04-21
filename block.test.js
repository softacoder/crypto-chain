const Block = require("./block");

describe("Block", () => {
  const timeStamp = "a-date";
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block({ timeStamp, lastHash, hash, data });

  it("has a timestamp, lastHash, hash, and data property", () => {
    expect(block.timestamp).toEqual(timeStamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});
