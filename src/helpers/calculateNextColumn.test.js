const calculateNextColumn = require("./calculateNextColumn");

const FIRST_COLUMN = [
  { sum: 1, dirFlag: "" },
  { sum: 2, dirFlag: "" },
  { sum: 3, dirFlag: "" },
];

const SECOND_COLUMN = [5, 6, 7];

describe("Calculating the next column", () => {
  it("returns an array", async () => {
    const result = calculateNextColumn(FIRST_COLUMN, SECOND_COLUMN);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].sum).toBe(7); // The 5 in the second column should add the 2 from the first column
  });
});
