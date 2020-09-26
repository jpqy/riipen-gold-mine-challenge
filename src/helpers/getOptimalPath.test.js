const getOptimalPath = require("./getOptimalPath");

describe("Getting the optimal path given a calculated mine", () => {
  it("returns a starting point and a direction string", () => {
    const CALCULATED_MINE = [
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
    const bestPath = getOptimalPath(CALCULATED_MINE);
    const { startingRow, directions } = bestPath;
    expect(typeof startingRow).toBe("number");
    expect(directions).not.toMatch(/[^dru]/);
    expect(directions).toBe("uru"); // See end of NOTES.md
    expect(startingRow).toBe(2); // See end of NOTES.md
  });
});
