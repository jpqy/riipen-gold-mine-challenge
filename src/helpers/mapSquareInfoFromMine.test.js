const mapSquareInfoFromMine = require("./mapSquareInfoFromMine");

describe("Mapping the SquareInfo from a mine", () => {
  const SMALL_MINE = [
    [1, 2, 2, 4],
    [6, 9, 8, 7],
    [6, 1, 0, 1],
    [1, 5, 4, 7],
  ];

  it("returns a 2D array", () => {
    const result = mapSquareInfoFromMine(SMALL_MINE);
    expect(Array.isArray(result)).toBe(true);
    expect(Array.isArray(result[0])).toBe(true);
  });
});
