/**
 * @typedef SquareInfo
 * @type {object}
 * @property {number} sum     The best gold sum achievable when reaching this square.
 * @property {string} dirFlag The previous direction that was taken to reach this square.
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
    // Find the maximum sum from the prevCol squares adjacent to nextCol
    const legalPrevColSums = [prevCol[i - 1], prevCol[i], prevCol[i + 1]]
      .filter((squareInfo) => !!squareInfo) // Filter out inexistent squareInfos that are outside of range (i.e [-1])
      .map((squareInfo) => squareInfo.sum);
    const maxSumFromPrevCol = Math.max(...legalPrevColSums);

    return { sum: nextColValue + maxSumFromPrevCol };
  });

  return nextColResults;
}

module.exports = calculateNextColumn;
