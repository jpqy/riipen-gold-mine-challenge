const { getColumn } = require("./arrayUtils");

describe("getColumn", () => {
  it("gets a column correctly", () => {
    const SMALL_MINE = [
      [1, 2, 2, 4],
      [6, 9, 8, 7],
      [6, 1, 0, 1],
      [1, 5, 4, 7],
      [1, 5, 4, 7],
    ];

    const column1 = getColumn(SMALL_MINE, 0);
    expect(column1).toStrictEqual([1, 6, 6, 1, 1]);
    const column4 = getColumn(SMALL_MINE, 3);
    expect(column4).toStrictEqual([4, 7, 1, 7, 7]);
  });
});
