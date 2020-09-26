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
  // Initialize rows of the mapped array, with each row being an array
  const mappedMine = [...Array(mine.length)].map((x) => []);

  // Turn the first column of the mine into SquareInfo objects
  for (let i = 0; i < mine.length; i++) {
    mappedMine[i][0] = { sum: mine[i][0], dirFlags: "" };
  }

  return mappedMine;
}

module.exports = mapSquareInfoFromMine;
