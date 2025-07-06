///////////////////////////////////////
// FUNCTION: SLEEP
///////////////////////////////////////

/**
 * A promise-based sleep function. Takes a number of milliseconds as an
 * argument and returns a promise that resolves after the given amount of
 * time has passed.
 * @param {number} ms The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the given amount of
 * time has passed.
 */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

///////////////////////////////////////
// FUNCTION: NEW MAZE
///////////////////////////////////////

/**
 * This function generates a maze by randomly traversing the grid and
 * recursively visiting unvisited neighbors. The function assumes that the
 * grid is a 2D array of NodeData objects, where each node has a row, col, and
 * isVisited property. The function will set the isWall property of nodes to
 * false as it visits them, and will leave the isWall property of the start and
 * finish nodes set to true. The function will also remove the "node-wall" class
 * from the start and finish nodes, and add the "node" class to the start and
 * finish nodes. The function will return a promise that resolves when the maze
 * is complete.
 *
 * @param {any} grid - The 2D array of NodeData objects representing the grid.
 * @returns {Promise<void>} - A promise that resolves when the maze is complete.
 */

export const newMaze = async (grid: any) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];
      node.isVisited = false;

      if (!node.isStart && !node.isFinish) {
        node.isWall = true;

        const element = document.getElementById(`node-${i}-${j}`);
        if (element) {
          element.classList.add('node-wall');
          element.classList.remove('node-start', 'node-finish'); // just in case
        }
      }
    }
  }

  const stack = [];
  const startRow = 1;
  const startCol = 1;
  const currentNode = grid[startRow][startCol];

  currentNode.isWall = false;
  currentNode.isVisited = true;

  const startElem = document.getElementById(`node-${startRow}-${startCol}`);
  if (startElem) {
    startElem.classList.remove('node-wall');
    startElem.classList.add('node');
  }

  stack.push(currentNode);

  while (stack.length > 0) {
    const current = stack.pop();
    const neighbors = getUnvisitedNeighbors(current, grid);

    if (neighbors.length > 0) {
      stack.push(current);

      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      next.isVisited = true;

      const wallRow = (current.row + next.row) / 2;
      const wallCol = (current.col + next.col) / 2;

      grid[wallRow][wallCol].isWall = false;
      grid[next.row][next.col].isWall = false;

      const wallElem = document.getElementById(`node-${wallRow}-${wallCol}`);
      const nextElem = document.getElementById(`node-${next.row}-${next.col}`);

      if (wallElem) {
        wallElem.classList.remove('node-wall');
        wallElem.classList.add('node');
      }

      if (nextElem) {
        nextElem.classList.remove('node-wall');
        nextElem.classList.add('node');
      }

      stack.push(next);
      await sleep(10); // optional for animation
    }
  }
};

///////////////////////////////////////
// FUNCTION: GET UNVISITED NEIGHBORS
///////////////////////////////////////

/**
 * Retrieves all unvisited neighbors for a given node in the grid.
 *
 * This function examines the node's position in the grid and collects its
 * adjacent neighbors that have not been visited yet. The neighbors are
 * checked in the following order: top, bottom, left, and right. A neighbor
 * is considered unvisited if its `isVisited` property is false.
 *
 * @param node - The node for which unvisited neighbors are to be found.
 * @param grid - The 2D array representing the grid of nodes.
 * @returns An array of unvisited neighboring nodes.
 */

function getUnvisitedNeighbors(node: any, grid: any) {
  const neighbors = [];
  const {row, col} = node;

  const directions = [
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (
      newRow > 0 &&
      newRow < grid.length &&
      newCol > 0 &&
      newCol < grid[0].length
    ) {
      const neighbor = grid[newRow][newCol];
      if (!neighbor.isVisited) {
        neighbors.push(neighbor);
      }
    }
  }

  return neighbors;
}
