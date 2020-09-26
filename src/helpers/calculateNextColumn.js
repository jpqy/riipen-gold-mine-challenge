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
  return [];
}

module.exports = calculateNextColumn;
