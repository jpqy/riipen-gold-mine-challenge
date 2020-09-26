const mapSquareInfoFromMine = require("./mapSquareInfoFromMine");
const { getColumn } = require("./arrayUtils");

describe("Mapping the SquareInfo from a mine", () => {
  const SMALL_MINE = [
    [1, 2, 2, 4],
    [6, 9, 8, 7],
    [6, 1, 0, 1],
    [9, 5, 4, 7],
  ];
  const result = mapSquareInfoFromMine(SMALL_MINE);

  it("returns a 2D array", () => {
    expect(Array.isArray(result)).toBe(true);
    expect(Array.isArray(result[0])).toBe(true);
  });

  it("returns a 2D array where the first column is SquareInfo objects", () => {
    expect(result[0][0]).toMatchObject({ sum: 1, dirFlags: "" });
    expect(result[2][0]).toMatchObject({ sum: 6, dirFlags: "" });
  });

  it("returns a 2D array where the second column are the correct SquareInfo objects", () => {
    const secondColumn = getColumn(result, 1);
    expect(secondColumn).toStrictEqual([
      { sum: 8, dirFlags: "u" },
      { sum: 15, dirFlags: "ru" },
      { sum: 10, dirFlags: "u" },
      { sum: 14, dirFlags: "r" },
    ]);
  });
});
