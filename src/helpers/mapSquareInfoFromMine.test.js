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

  it("returns the entire calculated SquareInfo objects", () => {
    const EXPECTED_RESULT = [
      [
        { sum: 1, dirFlags: "" },
        { sum: 8, dirFlags: "u" },
        { sum: 17, dirFlags: "u" },
        { sum: 27, dirFlags: "u" },
      ],
      [
        { sum: 6, dirFlags: "" },
        { sum: 15, dirFlags: "ru" },
        { sum: 23, dirFlags: "r" },
        { sum: 24, dirFlags: "d" },
      ],
      [
        { sum: 6, dirFlags: "" },
        { sum: 10, dirFlags: "u" },
        { sum: 0, dirFlags: "x" },
        { sum: 24, dirFlags: "d" },
      ],
      [
        { sum: 9, dirFlags: "" },
        { sum: 14, dirFlags: "r" },
        { sum: 14, dirFlags: "d" },
        { sum: 21, dirFlags: "r" },
      ],
    ];

    expect(result).toStrictEqual(EXPECTED_RESULT);
  });
});
