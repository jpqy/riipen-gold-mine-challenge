const calculateNextColumn = require("./calculateNextColumn");

const FIRST_COLUMN = [
  { sum: 1, dirFlag: "" },
  { sum: 2, dirFlag: "" },
  { sum: 3, dirFlag: "" },
];

const SECOND_COLUMN = [5, 6, 7];

describe("Calculating the next column", () => {
  const result = calculateNextColumn(FIRST_COLUMN, SECOND_COLUMN);

  it("returns an array", async () => {
    expect(Array.isArray(result)).toBe(true);
  });

  it("calculates the sum of the next column correctly", async () => {
    expect(result[0].sum).toBe(7); // The 5 in the second column should add the 2 from the first column
    expect(result[1].sum).toBe(9); // The 6 in the second column should add the 3 from the first column
    expect(result[2].sum).toBe(10); // The 7 in the second column should add the 3 from the first column
  });

  it("calculates the direction flag of the next column correctly", async () => {
    expect(result[0].dirFlag).toBe("u"); // The move from 2 to 5 is an upwards move
    expect(result[1].dirFlag).toBe("u"); // The move from 3 to 6 is upwards
    expect(result[2].dirFlag).toBe("r"); // The move from 3 to 7 is rightwards
  });
});
