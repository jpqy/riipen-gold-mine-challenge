/**
 * Gets the column of a 2D array as a 1D array, with the first element being the top row of the column.
 * @param {any[][]} array     The 2D array
 * @param {number}  colNumber A 0-based column number to get
 * @return {any[]}            A 1D array representing the column
 */
function getColumn(array, colNumber) {
  const column = [];
  for (let i = 0; i < array.length; i++) {
    column[i] = array[i][colNumber];
  }

  return column;
}

module.exports = { getColumn };
