const { getColumn, addColumn } = require("./arrayUtils");

describe("getColumn", () => {
  it("gets a column correctly", () => {
    const ARRAY_2D = [
      [1, 2, 2, 4],
      [6, 9, 8, 7],
      [6, 1, 0, 1],
      [1, 5, 4, 7],
      [1, 5, 4, 7],
    ];

    const column1 = getColumn(ARRAY_2D, 0);
    expect(column1).toStrictEqual([1, 6, 6, 1, 1]);
    const column4 = getColumn(ARRAY_2D, 3);
    expect(column4).toStrictEqual([4, 7, 1, 7, 7]);
  });
});

describe("addColumn", () => {
  it("adds a column correctly", () => {
    const ARRAY_2D = [
      [1, 2, 2, undefined],
      [6, 9, 8, undefined],
      [6, 1, 0, undefined],
      [1, 5, 4, undefined],
      [1, 5, 4, undefined],
    ];
    const COLUMN_TO_ADD = [1, 2, 3, 4, 5];

    addColumn(ARRAY_2D, COLUMN_TO_ADD, 3);
    const addedColumn = getColumn(ARRAY_2D, 3);
    expect(addedColumn).toStrictEqual(COLUMN_TO_ADD);
  });
});
