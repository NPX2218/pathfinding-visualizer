///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React from 'react';
import {NodeData} from '../Node/GridNode';
import GridNode from '../Node/GridNode';

///////////////////////////////////////
// INTERFACE: GRID PROPS
///////////////////////////////////////

interface GridProps {
  grid: NodeData[][];
  theme: string;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
}

///////////////////////////////////////
// COMPONENT: GRID
///////////////////////////////////////

const Grid = ({
  grid,
  theme,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: GridProps) => {
  return (
    <div className="grid">
      {grid.map((row: any, rowIdx: number) => {
        return (
          <div key={rowIdx}>
            {row.map((node: any, nodeIdx: number) => {
              const {row, col, isFinish, isStart, isWall} = node;
              return (
                <GridNode
                  theme={theme}
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  onMouseDown={(row: number, col: number) => {
                    handleMouseDown(row, col);
                  }}
                  onMouseEnter={(row: number, col: number) => {
                    handleMouseEnter(row, col);
                  }}
                  onMouseUp={() => handleMouseUp()}
                  row={row}></GridNode>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

///////////////////////////////////////
// EXPORTING GRID
///////////////////////////////////////

export default Grid;
