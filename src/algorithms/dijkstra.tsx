///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////
import {NodeData} from '../PathfindingVisualizer/Node/GridNode';

///////////////////////////////////////
// FUNCTION: DIKSTRA'S ALGORITHM
///////////////////////////////////////

/**
 * Implements Dijkstra's algorithm to find the shortest path between two nodes in a grid.
 *
 * It takes in a grid of nodes, a start node, and a finish node, and returns an object
 * with two properties: visitedNodesInOrder (an array of nodes in the order they were
 * visited) and startNodeDistance (the distance from the start node to the finish node).
 *
 * If the start node is trapped (i.e., there is no path from the start node to the finish
 * node), startNodeDistance will be null.
 *
 * @param {NodeData[][]} grid The grid of nodes.
 * @param {NodeData} startNode The start node.
 * @param {NodeData} finishNode The finish node.
 * @returns {Object} An object with two properties: visitedNodesInOrder and startNodeDistance.
 */

export const dijkstra = (
  grid: NodeData[][],
  startNode: NodeData,
  finishNode: NodeData,
) => {
  const visitedNodesInOrder: Array<NodeData> = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;

    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity)
      return {
        visitedNodesInOrder: visitedNodesInOrder,
        startNodeDistance: null,
      };
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode)
      return {
        visitedNodesInOrder: visitedNodesInOrder,
        startNodeDistance: closestNode.distance,
      };
    updateUnvisitedNeighbors(closestNode, grid as any);
  }
};

///////////////////////////////////////
// FUNCTION: SORT NODES BY DISTANCE
///////////////////////////////////////

/**
 * Sorts an array of unvisited nodes by their distance property.
 * This function modifies the provided array of unvisited nodes
 * to order them in ascending order based on their distance. If a node's
 * distance is undefined, it is treated as having infinite distance.
 *
 * @param unvisitedNodes - An array of NodeData objects representing
 *                         unvisited nodes in the grid.
 */

const sortNodesByDistance = (unvisitedNodes: Array<NodeData>): void => {
  unvisitedNodes.sort(
    (nodeA, nodeB) =>
      (nodeA.distance ?? Infinity) - (nodeB.distance ?? Infinity),
  );
};

///////////////////////////////////////
// FUNCTION: UPDATE UNVISITED NEIGHBORS
///////////////////////////////////////

/**
 * Updates the unvisited neighbors of the given node with the correct
 * distance values.
 *
 * Given a node and a grid, it finds all of the unvisited neighbors of
 * the given node, and updates their distance values to be one more
 * than the distance of the given node. It also sets the previousNode
 * property of each unvisited neighbor to be the given node.
 */
const updateUnvisitedNeighbors = (
  node: NodeData,
  grid: Array<NodeData>,
): void => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = (node.distance ?? Infinity) + 1;
    neighbor.previousNode = node;
  }
};

///////////////////////////////////////
// FUNCTION: GET UNVISITED NEIGHBORS
///////////////////////////////////////

/**
 * Retrieves all unvisited neighboring nodes for a given node in the grid.
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

const getUnvisitedNeighbors = (node: NodeData, grid: Array<any>): any => {
  console.log(grid);
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

///////////////////////////////////////
// FUNCTION: GET ALL NODES
///////////////////////////////////////

/**
 * Retrieves all nodes from a grid.
 *
 * Iterates through each row and each node within the row to
 * collect all nodes present in the grid. The function returns
 * a single array containing all nodes in the grid, maintaining
 * the order in which they appear.
 *
 * @param grid - A 2D array representing the grid of nodes.
 * @returns An array of all nodes in the grid.
 */

function getAllNodes(grid: Array<any>) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

///////////////////////////////////////
// CLASS: NODE
///////////////////////////////////////

/**
 * Retrieves the nodes in the shortest path order from the finish node.
 *
 * This function takes in the finish node and traverses back through the
 * `previousNode` property of each node until it reaches the start node.
 * It stores the nodes in the order they are encountered in an array and
 * returns the array once it has traversed the entire path.
 *
 * @param finishNode - The finish node of the path.
 * @returns An array of nodes in the shortest path order.
 */
export function getNodesInShortestPathOrder(finishNode: any) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
