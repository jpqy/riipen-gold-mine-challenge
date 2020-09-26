const calculateNextColumn = require("./calculateNextColumn");

describe("Calculating the next column", () => {
  const FIRST_COLUMN = [
    { sum: 1, dirFlag: "" },
    { sum: 2, dirFlag: "" },
    { sum: 3, dirFlag: "" },
  ];

  const SECOND_COLUMN = [5, 6, 7];

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
    expect(result[0].dirFlags).toBe("u"); // The move from 2 to 5 is an upwards move
    expect(result[1].dirFlags).toBe("u"); // The move from 3 to 6 is upwards
    expect(result[2].dirFlags).toBe("r"); // The move from 3 to 7 is rightwards
  });

  const TRICKY_FIRST_COLUMN = [
    { sum: 2, dirFlag: "" },
    { sum: 2, dirFlag: "" },
    { sum: 2, dirFlag: "" },
  ];
  const multiFlagResult = calculateNextColumn(TRICKY_FIRST_COLUMN, SECOND_COLUMN);

  it("handles when multiple direction flags should be set", async () => {
    expect(multiFlagResult[0].dirFlags).toBe("ru"); // The move from 2 to 5 can be righwards and upwards
    expect(multiFlagResult[1].dirFlags).toBe("dru"); // The move from 2 to 6 can be in all directions
    expect(multiFlagResult[2].dirFlags).toBe("dr");
  });

  it("calculates the sum correctly when multiple sums are the same in the first column", async () => {
    expect(multiFlagResult[0].sum).toBe(7);
    expect(multiFlagResult[1].sum).toBe(8);
    expect(multiFlagResult[2].sum).toBe(9);
  });
});
