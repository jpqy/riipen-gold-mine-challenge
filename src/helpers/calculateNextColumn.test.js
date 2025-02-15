const calculateNextColumn = require("./calculateNextColumn");

describe("Calculating the next column (easy tests)", () => {
  const FIRST_COLUMN = [
    { sum: 1, dirFlags: "" },
    { sum: 2, dirFlags: "" },
    { sum: 3, dirFlags: "" },
  ];
  const SECOND_COLUMN = [5, 6, 7];

  const result = calculateNextColumn(FIRST_COLUMN, SECOND_COLUMN);

  it("returns an array", () => {
    expect(Array.isArray(result)).toBe(true);
  });

  it("calculates the sum of the next column correctly", () => {
    expect(result[0].sum).toBe(7); // The 5 in the second column should add the 2 from the first column
    expect(result[1].sum).toBe(9); // The 6 in the second column should add the 3 from the first column
    expect(result[2].sum).toBe(10); // The 7 in the second column should add the 3 from the first column
  });

  it("calculates the direction flag of the next column correctly", () => {
    expect(result[0].dirFlags).toBe("u"); // The move from 2 to 5 is an upwards move
    expect(result[1].dirFlags).toBe("u"); // The move from 3 to 6 is upwards
    expect(result[2].dirFlags).toBe("r"); // The move from 3 to 7 is rightwards
  });
});

describe("Calculating the next column when the first column has identical sums", () => {
  const TRICKY_FIRST_COLUMN = [
    { sum: 2, dirFlags: "" },
    { sum: 2, dirFlags: "" },
    { sum: 2, dirFlags: "" },
  ];
  const SECOND_COLUMN = [5, 6, 7];

  const result = calculateNextColumn(TRICKY_FIRST_COLUMN, SECOND_COLUMN);

  it("handles when multiple direction flags should be set", () => {
    expect(result[0].dirFlags).toBe("ru"); // The move from 2 to 5 can be righwards and upwards
    expect(result[1].dirFlags).toBe("dru"); // The move from 2 to 6 can be from all directions
    expect(result[2].dirFlags).toBe("dr");
  });

  it("calculates the sum correctly", () => {
    expect(result[0].sum).toBe(7);
    expect(result[1].sum).toBe(8);
    expect(result[2].sum).toBe(9);
  });
});

describe("Calculating the next column when the first column has identical sums", () => {
  const TRICKY_FIRST_COLUMN = [
    { sum: 2, dirFlags: "" },
    { sum: 2, dirFlags: "" },
    { sum: 2, dirFlags: "" },
  ];
  const SECOND_COLUMN = [5, 6, 7];

  const result = calculateNextColumn(TRICKY_FIRST_COLUMN, SECOND_COLUMN);

  it("handles when multiple direction flags should be set", () => {
    expect(result[0].dirFlags).toBe("ru"); // The move from 2 to 5 can be righwards and upwards
    expect(result[1].dirFlags).toBe("dru"); // The move from 2 to 6 can be from all directions
    expect(result[2].dirFlags).toBe("dr");
  });

  it("calculates the sum correctly", () => {
    expect(result[0].sum).toBe(7);
    expect(result[1].sum).toBe(8);
    expect(result[2].sum).toBe(9);
  });
});

describe("Calculating the next column while respecting movement restrictions", () => {
  it("calculates the sum correctly", () => {
    const FIRST_COLUMN_WITH_MOVEMENT_RESTRICTION = [
      { sum: 1, dirFlags: "u" },
      { sum: 2, dirFlags: "u" },
      { sum: 3, dirFlags: "r" },
    ];
    const SECOND_COLUMN = [5, 6, 7];

    const result = calculateNextColumn(FIRST_COLUMN_WITH_MOVEMENT_RESTRICTION, SECOND_COLUMN);

    expect(result[0].sum).toBe(6); // 5 cannot sum with 2 so must sum with 1
    expect(result[1].sum).toBe(9); // 6 sums with 3
    expect(result[2].sum).toBe(9); // 7 cannot sum with 3 so must sum with 2
  });

  it("handles when no possible moves are available", () => {
    const FIRST_COLUMN_WITH_MOVEMENT_RESTRICTION = [
      { sum: 1, dirFlags: "r" },
      { sum: 2, dirFlags: "u" },
      { sum: 3, dirFlags: "r" },
    ];
    const SECOND_COLUMN = [5, 6, 7];

    const result = calculateNextColumn(FIRST_COLUMN_WITH_MOVEMENT_RESTRICTION, SECOND_COLUMN);

    // The square should be set to disabled
    expect(result[0].sum).toBe(0);
    expect(result[0].dirFlags).toBe("x");
  });
});

// The game actually ends when reaching a square with 0, so this must be represented somehow
describe("Dealing with disabled squares", () => {
  it("calculates disabled flag correctly when there are squares with 0", () => {
    const FIRST_COLUMN_WITH_MOVEMENT_RESTRICTION = [
      { sum: 1, dirFlags: "" },
      { sum: 2, dirFlags: "" },
      { sum: 3, dirFlags: "" },
    ];
    const SECOND_COLUMN = [0, 6, 7];

    const result = calculateNextColumn(FIRST_COLUMN_WITH_MOVEMENT_RESTRICTION, SECOND_COLUMN);

    expect(result[0].sum).toBe(0);
    expect(result[0].dirFlags).toBe("x");
    expect(result[1].sum).toBe(9);
    expect(result[2].sum).toBe(10);
  });

  it("reads the disabled flag correctly in the first column", () => {
    const FIRST_COLUMN_WITH_DISABLED_FLAGS = [
      { sum: 1, dirFlags: "" },
      { sum: 2, dirFlags: "x" },
      { sum: 3, dirFlags: "x" },
    ];
    const SECOND_COLUMN = [5, 6, 7];

    const result = calculateNextColumn(FIRST_COLUMN_WITH_DISABLED_FLAGS, SECOND_COLUMN);

    expect(result[0].sum).toBe(6);
    expect(result[1].sum).toBe(7);
    expect(result[2].sum).toBe(0);
    expect(result[2].dirFlags).toBe("x");
  });
});
