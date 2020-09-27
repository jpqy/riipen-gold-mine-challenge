import getOptimalPath from "./helpers/getOptimalPath.js";
import mapSquareInfoFromMine from "./helpers/mapSquareInfoFromMine.js";
import Position from "./position.js";

// A lookup table for movement directions in relation to row index
const directionLookup = {
  d: 1,
  r: 0,
  u: -1,
};

let optimalDirections;
/**
 * Replace the logic in this function with your own custom movement algorithm.
 *
 * This function should run in a reasonable amount of time and should attempt
 * to collect as much gold as possible.
 *
 * Remember, landing outside the mine's boundary or on a "0" on the mine will
 * result in the run completing.
 *
 * @param  {array} mine - A n x m multidimensional array respresenting the mine.
 * @param  {object} position - The current position of the miner, will be undefined on the first move
 *
 * @return {Position} The new position of the miner.
 */
const move = (mine, position) => {
  // If position is undefined (i.e. starting a new mine), calculate the SquareInfo of the entire mine, figure out
  // the optimal path, and store the directions in an outside variable
  if (!position) {
    const solvedMine = mapSquareInfoFromMine(mine);
    const optimalPath = getOptimalPath(solvedMine);
    const { startingRow, directions } = optimalPath;
    optimalDirections = directions; // A string representing the optimal directions (i.e. 'dudrdu')

    return new Position(0, startingRow);
  }

  // Use the optimalDirections string and current x position to figure out the next move
  const newX = position.x + 1;
  const direction = optimalDirections[position.x];
  const newY = position.y + directionLookup[direction];

  return new Position(newX, newY);
};

export default move;
