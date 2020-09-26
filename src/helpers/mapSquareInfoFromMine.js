/**
 * @typedef  SquareInfo        An object that tracks the highest sum of gold that is possible when reaching a
 *                             particular square of the mine, and the immediate previous direction it took to
 *                             achieve this sum.
 * @type     {object}
 * @property {number} sum      The best gold sum achievable when reaching this square.
 * @property {string} dirFlags The previous direction that was taken to reach this square. d = down, r = right, u = up
 *                             x = this square should be considered disabled
 */

const { getColumn, addColumn } = require("./arrayUtils");
const calculateNextColumn = require("./calculateNextColumn");

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

  // Get the first column of SquareInfo and the second column of the mine and run it through calculateNextColumn
  for (let i = 1; i < mine[0].length; i++) {
    const prevColumnSquareInfo = getColumn(mappedMine, i - 1);
    const nextColumnGold = getColumn(mine, i);
    const nextColumnSquareInfo = calculateNextColumn(prevColumnSquareInfo, nextColumnGold);

    // Add the column to mappedMine
    addColumn(mappedMine, nextColumnSquareInfo, i);
  }

  return mappedMine;
}

module.exports = mapSquareInfoFromMine;
