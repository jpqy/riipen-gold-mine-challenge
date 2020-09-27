/**
 * @typedef  SquareInfo        An object that tracks the highest sum of gold that is possible when reaching a
 *                             particular square of the mine, and the immediate previous direction it took to
 *                             achieve this sum.
 * @type     {object}
 * @property {number} sum      The best gold sum achievable when reaching this square.
 * @property {string} dirFlags The previous direction that was taken to reach this square. d = down, r = right, u = up
 *                             x = this square should be considered disabled
 */

/**
 * Given the previous column of a mine represented as SquareInfos and the subsequent column of the mine represented as
 * gold values, calculates the SquareInfo for the subsequent column.
 * @param {SquareInfo[]}  prevColSquareInfo An array representing the previous, calculated SquareInfo column of a mine
 * @param {number[]}      nextColGold       An array representing the subsequent, uncalculated column of the mine,
 *                                          containing positive integers representing gold values
 * @return {SquareInfo[]}                   A newly calculated SquareInfo column that replaces nextColGold
 */
function calculateNextColumn(prevColSquareInfo, nextColGold) {
  const nextColSquareInfo = nextColGold.map((gold, i) => {
    // If the square's gold is 0, set its flag to disabled
    if (gold === 0) {
      return { sum: 0, dirFlags: "x" };
    }
    const [prevUpperSquare, prevMiddleSquare, prevLowerSquare] = [
      prevColSquareInfo[i - 1],
      prevColSquareInfo[i],
      prevColSquareInfo[i + 1],
    ];
    // Find the max sum from the previous columns squares adjacent to current square
    const legalPrevColSums = [prevUpperSquare, prevMiddleSquare, prevLowerSquare]
      .filter((squareInfo, j) => {
        if (!squareInfo) return false; // Filter out inexistent squareInfos that are outside of range (i.e [-1])

        // If the squareInfo is disabled (i.e. it hit a 0), filter it out
        if (squareInfo.dirFlags === "x") return false;

        // Check if squareInfo has a single dirFlag and filter it out if it would mean making the same move twice
        if (j === 0 && squareInfo.dirFlags === "d") return false;
        if (j === 1 && squareInfo.dirFlags === "r") return false;
        if (j === 2 && squareInfo.dirFlags === "u") return false;

        // Multiple or no flags (i.e. very first column of mine) means any subsequent direction is legal
        return true;
      })
      .map((squareInfo) => squareInfo.sum);

    // If there are no legal moves to the current square, set its flag to disabled
    if (legalPrevColSums.length === 0) {
      return { sum: 0, dirFlags: "x" };
    }

    const maxSumFromPrevCol = Math.max(...legalPrevColSums);

    // Find the direction(s) that need to be taken to go from the previous square with the highest sum to the current square.
    // Add another check to make sure we aren't making the same move twice.
    const dirFlags = `${
      prevUpperSquare && prevUpperSquare.dirFlags !== "d" && prevUpperSquare.sum === maxSumFromPrevCol ? "d" : ""
    }${prevMiddleSquare && prevMiddleSquare.dirFlags !== "r" && prevMiddleSquare.sum === maxSumFromPrevCol ? "r" : ""}${
      prevLowerSquare && prevLowerSquare.dirFlags !== "u" && prevLowerSquare.sum === maxSumFromPrevCol ? "u" : ""
    }`;

    return { sum: gold + maxSumFromPrevCol, dirFlags };
  });

  return nextColSquareInfo;
}

module.exports = calculateNextColumn;
