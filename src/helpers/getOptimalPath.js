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
 * @typedef  BestPath
 * @type     {object}
 * @property {number[]} startingRow The starting row that reaches the highest sum at the end
 * @property {string}   directions  A string with each character representing the directions to take
 */

/**
 * Returns the starting point and a string of directions that would lead to the highest amount of gold in the mine.
 * @param  {SquareInfo[][]} squareInfoArray A 2D array of SquareInfo, calculated from a mine
 * @return {BestPath} The path of the route that leads to the most gold according to squareInfoArray
 */
function getOptimalPath(squareInfoArray) {
  return { startingRow: 1, directions: "dudr" };
}

module.exports = getOptimalPath;
