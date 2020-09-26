/**
 * @typedef SquareInfo
 * @type {object}
 * @property {number} sum      The best gold sum achievable when reaching this square.
 * @property {string} dirFlags The previous direction that was taken to reach this square.
 */

/**
 *
 * @param {SquareInfo[]} prevCol An array representing the previous column of a mine, each containing a gold sum and
 *                               direction flag(s) representing the direction taken to reach that square.
 * @param {number[]}     nextCol An array representing the next column of the mine in gold value as an integer.
 * @return                       An array with new SquareInfo calculated for the nextCol.
 */
function calculateNextColumn(prevCol, nextCol) {
  const nextColResults = nextCol.map((nextColValue, i) => {
    // Find the max sum from the prevCol squares adjacent to nextCol
    const legalPrevColSums = [prevCol[i - 1], prevCol[i], prevCol[i + 1]]
      .filter((squareInfo, j) => {
        if (!squareInfo) return false; // Filter out inexistent squareInfos that are outside of range (i.e [-1])

        // Check if prevCol has a single dirFlag and filter it out if it would mean making the same move twice
        if (j === 0 && squareInfo.dirFlags === "d") return false;
        if (j === 1 && squareInfo.dirFlags === "r") return false;
        if (j === 2 && squareInfo.dirFlags === "u") return false;

        // Multiple or no flags (i.e. very first column of mine) means any subsequent direction is legal
        return true;
      })
      .map((squareInfo) => squareInfo.sum);
    const maxSumFromPrevCol = Math.max(...legalPrevColSums);

    // Find the direction(s) that would have been taken from the max sum(s) of prevCol to nextCol.
    const dirFlags = `${prevCol[i - 1] && prevCol[i - 1].sum === maxSumFromPrevCol ? "d" : ""}${
      prevCol[i] && prevCol[i].sum === maxSumFromPrevCol ? "r" : ""
    }${prevCol[i + 1] && prevCol[i + 1].sum === maxSumFromPrevCol ? "u" : ""}`;

    return { sum: nextColValue + maxSumFromPrevCol, dirFlags };
  });

  return nextColResults;
}

module.exports = calculateNextColumn;
