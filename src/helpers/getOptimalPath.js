/**
 * @typedef  SquareInfo        An object that tracks the highest sum of gold that is possible when reaching a
 *                             particular square of the mine, and the immediate previous direction it took to
 *                             achieve this sum.
 * @type     {object}
 * @property {number} sum      The best gold sum achievable when reaching this square.
 * @property {string} dirFlags The previous direction that was taken to reach this square. d = down, r = right, u = up
 *                             x = this square should be considered disabled
 */

const { getColumn } = require("./arrayUtils");

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
  // Get the row number of the last column with the highest sum
  const indexOfLastColumn = squareInfoArray[0].length - 1;
  const lastColumn = getColumn(squareInfoArray, indexOfLastColumn);
  const lastColumnSums = lastColumn.map((squareInfo) => squareInfo.sum);
  const maxFinalSum = Math.max(...lastColumnSums);
  const endingRow = lastColumnSums.indexOf(maxFinalSum);

  // Store directions as 1-character array
  const directions = [];

  // Starting at the end square, store the direction from the dirFlag and use it to move to the previous square
  let currentRow = endingRow;
  for (let i = indexOfLastColumn; i > 0; i--) {
    const previousDirFlags = squareInfoArray[currentRow][i].dirFlags;

    // If more than one flag, pick the one that isn't a repeat of the next direction
    let previousDirection;
    if (previousDirFlags.length > 1) {
      previousDirection = previousDirFlags.split("").find((direction) => direction !== directions[0]);
    } else {
      previousDirection = previousDirFlags;
    }
    directions.unshift(previousDirection);

    // Move up or down depending on the previous direction
    if (previousDirection === "d") {
      currentRow--; // The previous movement was downwards, so we must go upwards to reach the previous square
    } else if (previousDirection === "u") {
      currentRow++;
    }
  }
  return { startingRow: currentRow, directions: directions.join("") };
}

module.exports = getOptimalPath;
