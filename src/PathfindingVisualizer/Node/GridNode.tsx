///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React, {Component} from 'react';
import './Node.css';

///////////////////////////////////////
// INTERFACE: NODE DATA
///////////////////////////////////////

export interface NodeData {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  distance?: number | null;
  previousNode?: NodeData | null | undefined;
  isVisited?: boolean | null;
}

///////////////////////////////////////
// INTERFACE: GRID NODE PROPS
///////////////////////////////////////

export interface GridNodeProps extends NodeData {
  theme: string;
  onMouseDown: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

///////////////////////////////////////
// CLASS: GRID NODE
///////////////////////////////////////

export default class GridNode extends Component<GridNodeProps, {}> {
  render() {
    const {
      row,
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      theme,
    } = this.props;
    const extraClassName = isFinish
      ? `node-finish`
      : isStart
      ? `node-start`
      : isWall
      ? `node-wall`
      : '';
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName} ${theme}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}></div>
    );
  }
}
