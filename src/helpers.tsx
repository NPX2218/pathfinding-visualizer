///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import {NodeData} from './PathfindingVisualizer/Node/GridNode';
import {
  COLS,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  ROWS,
  START_NODE_COL,
  START_NODE_ROW,
} from './PathfindingVisualizer/PathfindingVisualizer';

///////////////////////////////////////
// FUNCTION: CREATE NODE
///////////////////////////////////////

/**
 * Creates a node for the grid with specified column and row indices.
 *
 * @param col - The column index of the node.
 * @param row - The row index of the node.
 * @returns A NodeData object representing a grid node.
 */

export const createNode = (col: number, row: number): NodeData => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL, // Determines if this node is the starting node
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL, // Determines if this node is the finishing node
    distance: Infinity, // Initial distance set to infinity for pathfinding algorithms
    isVisited: false, // Indicates whether the node has been visited
    isWall: false, // Indicates whether the node is a wall
    previousNode: null, // Reference to the previous node for path tracking
  };
};

///////////////////////////////////////
// FUNCTION: GET INITIAL GRID
///////////////////////////////////////

/**
 * Generates the initial grid of nodes for the pathfinding visualizer.
 *
 * Iterates over the specified number of rows and columns to create a
 * two-dimensional array of NodeData objects. Each node is initialized
 * with its respective column and row indices and default properties
 * such as isStart, isFinish, distance, isVisited, isWall, and previousNode.
 *
 * @returns A 2D array of NodeData objects representing the initial grid.
 */

export const getInitialGrid = (): NodeData[][] => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

///////////////////////////////////////
// FUNCTION: ROUNDING ALL TABLE CORNERS
///////////////////////////////////////

/**
 * Rounds all table corners of the grid.
 *
 * Iterates over the four corners of the grid and applies a CSS
 * border radius to each corner node. The border radius is configured
 * to round the respective corner of the table.
 *
 * @param grid - The 2D array of NodeData objects representing the grid.
 * @returns Nothing.
 */
export const roundTableCorners = (grid: NodeData[][]): void => {
  const cornerConfigs = [
    {
      node: grid[0][0],
      borderRadius: '5px 0px 0px 0px',
    },
    {
      node: grid[0][COLS - 1],
      borderRadius: '0px 5px 0px 0px',
    },
    {
      node: grid[ROWS - 1][0],
      borderRadius: '0px 0px 0px 5px',
    },
    {
      node: grid[ROWS - 1][COLS - 1],
      borderRadius: '0px 0px 5px 0px',
    },
  ];

  cornerConfigs.forEach(({node, borderRadius}) => {
    const element = document.getElementById(`node-${node.row}-${node.col}`);
    if (element) {
      element.style.borderRadius = borderRadius;
    }
  });
};

///////////////////////////////////////
// FUNCTION: GET NEW GRID WITH WALL TOGGLED
///////////////////////////////////////

/**
 * Toggles the wall state of a node in the grid at the specified row and column.
 *
 * Creates a new grid with the wall state of the node at the given coordinates
 * inverted. If the node is currently a wall, it will be changed to a non-wall,
 * and vice versa.
 *
 * @param grid - The current 2D array of NodeData objects representing the grid.
 * @param row - The row index of the node to be toggled.
 * @param col - The column index of the node to be toggled.
 * @returns A new 2D array of NodeData objects with the specified node's wall
 * state toggled.
 */

export const getNewGridWithWallToggled = (
  grid: NodeData[][],
  row: number,
  col: number,
): NodeData[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isFinish) return newGrid;
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

///////////////////////////////////////
// FUNCTION: SET HTML CLASS ON NODE
///////////////////////////////////////

/**
 * Adds a class or multiple classes to a DOM node with the given ID.
 *
 * @param node - The ID of the DOM node to which the class should be added.
 * @param classNameString - A string of classes to be added. Multiple classes
 * should be separated by commas or spaces.
 */

export const setHTMLClass = (node: string, classNameString: string): void => {
  const element = document.getElementById(node);
  element && classNameString
    ? classNameString.split(',').forEach(className => {
        className.split(' ').forEach(classNameSplit => {
          element.classList.add(classNameSplit);
        });
      })
    : console.log('Set HTML Class not found');
};
