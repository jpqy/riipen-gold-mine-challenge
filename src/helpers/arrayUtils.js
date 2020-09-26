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

/**
 * Inserts a 1D array representing a column into a 2D array at the specified column position.
 * Note: mutates the array in place.
 * @param  {any[][]}  array     The 2D array
 * @param  {any[]}    column    A 1D array representing the column values to add
 * @param  {number}   colNumber A position to add the column
 * @return {any[][]}            An updated 2D array with the column values inserted
 */
function addColumn(array, column, colNumber) {
  for (let i = 0; i < array.length; i++) {
    array[i][colNumber] = column[i];
  }
  return array;
}

module.exports = { getColumn, addColumn };
