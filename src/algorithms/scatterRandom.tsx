///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import {NodeData} from '../PathfindingVisualizer/Node/GridNode';

///////////////////////////////////////
// FUNCTION: SCATTER RANDOM
///////////////////////////////////////

const scatterRandom = (
  grid: NodeData[][],
  probabilityOfWall: number,
): NodeData[][] => {
  const newGrid = grid.map(row =>
    row.map(node => {
      if (!node.isStart && !node.isFinish) {
        const isWall = Math.random() < probabilityOfWall;
        const currentNodeHTML = document.getElementById(
          `node-${node.row}-${node.col}`,
        );
        if (currentNodeHTML) {
          currentNodeHTML.classList.remove(
            'node-shortest-path',
            'node-visited',
          );
        }
        return {
          ...node,
          isWall,
          isVisited: false,
        };
      } else {
        return {
          ...node,
          isVisited: false,
        };
      }
    }),
  );

  return newGrid;
};

///////////////////////////////////////
// EXPORTING SCATTER RANDOM
///////////////////////////////////////

export default scatterRandom;
