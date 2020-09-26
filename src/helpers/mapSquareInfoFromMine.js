/**
 * @typedef SquareInfo
 * @type {object}
 * @property {number} sum      The best gold sum achievable when reaching this square.
 * @property {string} dirFlags The previous direction that was taken to reach this square. d = down, r = right, u = up
 *                             x = this square should be considered disabled
 */

/**
 *
 * @param  {number[][]}     mine A 2D array of positive integers representing the mine and its gold values
 * @return {SquareInfo[][]}      A 2D array of SquareInfo
 */
function mapSquareInfoFromMine(mine) {
  return [[]];
}

module.exports = mapSquareInfoFromMine;
