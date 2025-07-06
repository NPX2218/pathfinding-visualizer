///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React, {Component} from 'react';
import {NodeData} from './Node/GridNode';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import './PathfindingVisualizer.css';
import scatterRandom from '../algorithms/scatterRandom';
import {newMaze} from '../algorithms/generateMaze';
import Navbar from '../components/Navbar';
import TextArea from '../components/TextArea';
import Footer from '../components/Footer';
import Popup from '../components/Popup';
import Grid from './Grid/Grid';
import NodeTypesShowcase from '../components/NodeTypesShowcase';
import {
  getInitialGrid,
  getNewGridWithWallToggled,
  roundTableCorners,
  setHTMLClass,
} from '../helpers';

///////////////////////////////////////
// CONSTANTS
///////////////////////////////////////
let windowWidth: number,
  windowHeight: number,
  ROWS: number,
  COLS: number,
  START_NODE_COL: number,
  START_NODE_ROW: number,
  FINISH_NODE_COL: number,
  FINISH_NODE_ROW: number;

///////////////////////////////////////
// FUNCTION: RECONFIGURE VARIABLES
///////////////////////////////////////

/**
 * Reconfigures the global variables used for the grid's dimensions and the
 * start and finish node's positions based on the current window's dimensions.
 *
 * This is used to ensure the grid and nodes are always properly positioned
 * and sized, regardless of the window's size.
 *
 * @function reconfigureVariables
 * @returns {void}
 */
const reconfigureVariables = (): void => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  ROWS = Math.floor(windowHeight / 50);
  COLS = Math.floor(windowWidth / 30);
  START_NODE_COL = Math.floor(COLS / 5.5);
  START_NODE_ROW = Math.floor(ROWS / 2);
  FINISH_NODE_COL = Math.floor(COLS / 1.25);
  FINISH_NODE_ROW = Math.floor(ROWS / 2);
};

reconfigureVariables();

export {
  ROWS,
  COLS,
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
};

///////////////////////////////////////
// CLASS: PATHFINDINGVISUALIZER
///////////////////////////////////////

interface PathfindingVisualizerState {
  grid: NodeData[][];
  rightMouseIsPressed: boolean;
  leftMouseIsPressed: boolean;
  isAnimationRunning: boolean;
  animationSpeed: number;
  executionTime: string;
  executionPathDistance: string;
  popupShow: boolean;
  scatterRandomProbability: number;
  theme: string;
}

export default class PathfindingVisualizer extends Component<
  {},
  PathfindingVisualizerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      executionTime: '',
      executionPathDistance: '',
      grid: [],
      rightMouseIsPressed: false,
      leftMouseIsPressed: false,
      animationSpeed: 3,
      isAnimationRunning: false,
      scatterRandomProbability: 0.5,
      // ! set popup to show later
      popupShow: false,
      theme: 'default',
    };
  }

  ///////////////////////////////////////
  // FUNCTION: PATHFINDINGVISUALIZER ON MOUNT
  ///////////////////////////////////////

  componentDidMount() {
    window.addEventListener('resize', () => {
      reconfigureVariables();
      const grid = getInitialGrid();
      this.setState({grid});
    });
    const grid = getInitialGrid();
    this.setState({grid});

    setTimeout(() => {
      roundTableCorners(grid);
    }, 1000);

    window.onload = function () {
      const nodes = document.querySelectorAll('.node');
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('mouseenter', function (e: Event) {
          nodes[i].classList.add('node-hover');
        });
        nodes[i].addEventListener('mouseleave', function (e: Event) {
          nodes[i].classList.remove('node-hover');
        });
      }
    };
  }

  ///////////////////////////////////////
  // FUNCTION: PATHFINDINGVISUALIZER ON STATE RELOAD AND UPDATE
  ///////////////////////////////////////

  /**
   * Function to be called when the component has been updated.
   * It handles the pressing of 's' and 'f' keys to change the start and finish nodes.
   * It also removes the old start and finish nodes.
   *
   * @returns {void}
   */
  componentDidUpdate(prevProps: Object, prevState: PathfindingVisualizerState) {
    const {grid} = this.state;
    document.addEventListener('keypress', event => {
      if (grid !== prevState.grid) {
        const nodeHTML = document.getElementsByClassName('node-hover')[0];
        let [_, row, col] = nodeHTML.id.split('-').map(Number);

        if (event.key === 's' && this.state.isAnimationRunning === false) {
          nodeHTML
            ? (grid[row][col].isStart && grid[row][col].isFinish) === false
              ? document
                  .getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`)
                  ?.classList.remove('node-start', 'node-img-start')
              : console.log('Error setting new start node')
            : console.log('Node HTML not found');
          grid[START_NODE_ROW][START_NODE_COL].isStart = false;

          nodeHTML.classList.add('node-start');
          nodeHTML.classList.remove('node-hover');

          grid[row][col].isStart = true;
          grid[row][col].isWall = false;

          START_NODE_ROW = row;
          START_NODE_COL = col;
        }

        if (event.key === 'f' && this.state.isAnimationRunning === false) {
          if (nodeHTML) {
            (grid[row][col].isStart && grid[row][col].isFinish) === false
              ? document
                  .getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`)
                  ?.classList.remove('node-finish', 'node-img-finish')
              : console.log('Error setting new finish node');
            grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = false;

            nodeHTML.classList.add('node-finish');
            nodeHTML.classList.remove('node-hover');

            grid[row][col].isFinish = true;
            grid[row][col].isWall = false;

            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
          }
        }
      }
    });
  }

  ///////////////////////////////////////
  // FUNCTION: SHOW POP-UP
  ///////////////////////////////////////
  showPopupFunction = () => {
    this.setState({popupShow: !this.state.popupShow});
  };
  ///////////////////////////////////////
  // FUNCTIONS: MOUSE EVENTS
  ///////////////////////////////////////

  handleMouseDown = (row: number, col: number): void => {
    const isStartOrFinish =
      (row === START_NODE_ROW && col === START_NODE_COL) ||
      (row === FINISH_NODE_ROW && col === FINISH_NODE_COL);

    if (!isStartOrFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }

    this.setState({
      rightMouseIsPressed: true,
    });
  };

  handleMouseEnter = (row: number, col: number): void => {
    if (!this.state.rightMouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  };

  handleMouseUp = (): void => {
    this.setState({rightMouseIsPressed: false});
  };

  ///////////////////////////////////////
  // FUNCTION: ANIMATE DIJKSTRA
  ///////////////////////////////////////
  /**
   * Animate the visited nodes.
   *
   *
   * @param {any[]} nodesInShortestPathOrder the nodes in the shortest path, in order
   * @param {any[]} visitedNodesInOrder the nodes visited in order
   * @param {number | null} startNodeDistance the distance from the start node to the
   *   first node in the shortest path, or null if there is no shortest path
   */

  animateDijkstra(
    visitedNodesInOrder: Array<any>,
    nodesInShortestPathOrder: Array<any>,
    startNodeDistance: number,
  ) {
    const {animationSpeed} = this.state;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder, startNodeDistance);
        }, animationSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.isStart === true) {
          setHTMLClass(
            `node-${node.row}-${node.col}`,
            `node node-img-start ${this.state.theme}`,
          );
        } else if (node.isFinish === true) {
          setHTMLClass(
            `node-${node.row}-${node.col}`,
            `node node-img-finish ${this.state.theme}`,
          );
        } else {
          setHTMLClass(
            `node-${node.row}-${node.col}`,
            `node node-visited ${this.state.theme}`,
          );
        }
      }, animationSpeed * i);
    }
  }

  ///////////////////////////////////////
  // FUNCTION: ANIMATE SHORTEST PATH
  // BETWEEN START AND FINISH NODE
  ///////////////////////////////////////

  /**
   * Animate the shortest path between start and finish node.
   *
   * Iterate through the nodes in the shortest path and set a CSS class on each node
   * element to make it look like it's part of the shortest path. The CSS class is
   * determined by the direction from the previous node to the current node.
   *
   * @param {any[]} nodesInShortestPathOrder the nodes in the shortest path, in order
   * @param {number | null} startNodeDistance the distance from the start node to the
   *   first node in the shortest path, or null if there is no shortest path
   */
  animateShortestPath(
    nodesInShortestPathOrder: any[],
    startNodeDistance: number | null,
  ) {
    const {theme} = this.state;

    const getDirectionClass = (from: any, to: any): string => {
      if (!from || !to) return '';
      if (from.row > to.row) return 'node-shortest-path-up';
      if (from.row < to.row) return 'node-shortest-path-down';
      if (from.col > to.col) return 'node-shortest-path-left';
      if (from.col < to.col) return 'node-shortest-path-right';
      return '';
    };

    nodesInShortestPathOrder.forEach((node, i) => {
      setTimeout(() => {
        const prev = nodesInShortestPathOrder[i - 1];
        const next = nodesInShortestPathOrder[i + 1];
        const nodeId = `node-${node.row}-${node.col}`;

        if (node.isStart) {
          const dirClass = getDirectionClass(node, next);
          setHTMLClass(nodeId, `node ${dirClass} node-img-start ${theme}`);
          return;
        }

        if (node.isFinish && startNodeDistance !== null) {
          const dirClass = getDirectionClass(prev, node);
          setHTMLClass(nodeId, `node ${dirClass} node-img-finish ${theme}`);
          return;
        }

        if (!node.isFinish && startNodeDistance !== null && prev) {
          const dirClass = getDirectionClass(prev, node);
          setHTMLClass(nodeId, `node ${dirClass} ${theme}`);
        }
      }, 50 * i);
    });

    // Reset animation flag after all animations are done
    setTimeout(() => {
      this.setState({isAnimationRunning: false});
    }, 50 * nodesInShortestPathOrder.length + 500);
  }

  ///////////////////////////////////////
  // FUNCTION: CLEAR GRID
  ///////////////////////////////////////

  /**
   * Clears the grid by resetting all nodes to their initial state.
   *
   * @returns void.
   */

  clearGrid = (): void => {
    if (this.state.isAnimationRunning) return;
    const {grid, theme} = this.state;

    // Clears any metrics
    this.setState({executionPathDistance: '', executionTime: ''});

    //Clear algorithm display
    const algorithmTime = document.getElementById('algorithm-time');
    algorithmTime
      ? (algorithmTime.innerHTML = '')
      : console.log('Algorithm time not found');

    const getClassName = (node: NodeData): string => {
      if (node.isStart) return `node node-start ${theme}`;
      if (node.isFinish) return `node node-finish ${theme}`;
      if (node.isWall) return `node node-wall ${theme}`;
      return `node ${theme}`;
    };

    for (const row of grid) {
      for (const node of row) {
        node.isVisited = false;
        node.isWall = false;
        node.distance = Infinity;
        node.previousNode = null;

        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`,
        );
        if (nodeElement) {
          nodeElement.className = getClassName(node);
        }
      }
    }
  };

  ///////////////////////////////////////
  // FUNCTION: VISUALIZE DIJKSTRA
  ///////////////////////////////////////

  /**
   *  Visualizes the Dijkstra's algorithm on the grid.
   *
   * @returns void
   */
  visualizeDijkstra = (): void => {
    if (this.state.isAnimationRunning) return;

    this.setState({isAnimationRunning: true});

    const {grid, theme} = this.state;

    grid.forEach(row =>
      row.forEach((node): NodeData | undefined => {
        const el = document.getElementById(`node-${node.row}-${node.col}`);
        if (!el) return;

        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;

        const classMap = {
          start: `node node-img-start ${theme}`,
          finish: `node node-img-finish ${theme}`,
          wall: `node node-wall ${theme}`,
          default: `node ${theme}`,
        };

        const key = node.isStart
          ? 'start'
          : node.isFinish
          ? 'finish'
          : node.isWall
          ? 'wall'
          : 'default';

        el.className = classMap[key];
      }),
    );

    const t0 = performance.now();
    const start = grid[START_NODE_ROW][START_NODE_COL];
    const finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const result = dijkstra(grid, start, finish);

    if (!result) return;

    const {visitedNodesInOrder, startNodeDistance} = result;
    const path = getNodesInShortestPathOrder(finish);

    this.animateDijkstra(visitedNodesInOrder, path, startNodeDistance);

    const t1 = performance.now();
    const timeInSeconds = ((t1 - t0) / 1000).toFixed(2);

    this.setState({
      executionTime: timeInSeconds,
      executionPathDistance: startNodeDistance,
    });
  };

  ///////////////////////////////////////
  // FUNCTION: RENDER TO SCREEN
  ///////////////////////////////////////

  render() {
    return (
      <>
        <Popup
          popupShow={this.state.popupShow}
          instructions={this.showPopupFunction}
        />

        <Navbar
          generateMaze={this.generateRandomMaze}
          clearGrid={this.clearGrid}
          visualizeDijkstra={this.visualizeDijkstra}
          instructions={this.showPopupFunction}
        />

        <div className="w-full h-full">
          <div className="w-[85%] h-full mx-auto">
            <NodeTypesShowcase />
          </div>
        </div>
        <div className=" flex text-center w-full h-full items-center justify-center">
          <Grid
            grid={this.state.grid}
            theme={this.state.theme}
            handleMouseDown={this.handleMouseDown}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseUp={this.handleMouseUp}
          />
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div className="max-w-[90%] md:max-w-[85%] flex flex-col justify-center md:flex-row">
            <div className="w-full md:w-1/2 h-full">
              <TextArea text="Dijkstra's Algorithm">
                {this.state.executionPathDistance &&
                  this.state.executionTime && (
                    <p className="text-black" id="algorithm-time">
                      Dijkstra's algorithm took {this.state.executionTime}{' '}
                      seconds to execute and {this.state.executionPathDistance}{' '}
                      steps
                    </p>
                  )}
                {this.state.executionPathDistance === null &&
                  this.state.executionTime && (
                    <p className="text-black" id="algorithm-time">
                      Dijkstra's algorithm took {this.state.executionTime}{' '}
                      seconds to execute and cannot reach the target node it is
                      enclosed into a box!
                    </p>
                  )}
                <p className="text-black">
                  Finds the shortest path between two nodes in a graph, it sets
                  every nodes distance to Infinity, as we haven't started out
                  search yet. Once the execution begins start / source node
                  searches up, down, left and right. It continues this
                  throughout the execution to find the finish node.{' '}
                </p>
                <hr />
                <div className="flex justify-between items-center">
                  <button onClick={this.visualizeDijkstra}>
                    Run Dijkstra's
                  </button>

                  <button onClick={this.clearGrid}>
                    {' '}
                    <i className="fa fa-refresh" aria-hidden="true"></i> &nbsp;
                    Reset Grid
                  </button>
                </div>
              </TextArea>
              <div className=" w-full h-full">
                <TextArea>
                  <div className="container w-full">
                    <br />
                    <div className="note-group">
                      <p className="text-black">Theme</p>

                      {/*<label style={{paddingBottom: '15px'}}>
                  This button allows you to change your theme of the Pathfinding
                  Visualizer. There are two modes.
                  <ul
                    style={{
                      listStyleType: 'disc',
                      paddingTop: '10px',
                    }}>
                    <li>
                      <b>Road Mode: </b> In this mode, you will be able to
                      visualize the program in a way that google maps would
                      allow a user to find the shortest distance to the location
                      that they want to go to.
                    </li>
                    <li>
                      <b>Default Mode: </b> This mode is the normal mode, where
                      the start node and finish node have no specific skins.
                      This would allow you to plainly visualize the program.{' '}
                    </li>
                  </ul>
                </label>*/}
                      <button
                        className="w-full"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                        ) => {
                          this.setState({
                            theme:
                              this.state.theme === 'default'
                                ? 'road'
                                : 'default',
                          });
                        }}>
                        {this.state.theme === 'default' ? 'Road' : 'Default'}{' '}
                        Mode!
                      </button>
                    </div>
                  </div>
                </TextArea>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <TextArea text="Settings">
                <div className="container">
                  <form>
                    <div className="note-group">
                      {/*<label>
                    This slider allows you to change the probability of a wall
                    being generated, so the lower the number the higher the
                    chance one of them is a wall, meaning that there is a{' '}
                    {this.state.scatterRandomProbability} (
                    {Math.round(this.state.scatterRandomProbability * 100)}
                    %) chance that each node will be a wall when pressing the
                    scatter random button.{' '}
                  </label>
                  <br></br>
                  <br />*/}
                      <label
                        className="text-black flex justify-between items-center p-0 m-0"
                        htmlFor="formControlRange">
                        <span>Scatter Wall Probability:</span>
                        <p style={{color: 'black'}}>
                          {this.state.scatterRandomProbability * 100} %
                        </p>
                      </label>
                      <input
                        type="range"
                        value={this.state.scatterRandomProbability}
                        min={0}
                        max={1}
                        step="0.1"
                        className="h-[4px] rounded-lg w-full bg-[#1F3247] accent-[#1F3247]"
                        id="formControlRange"
                        onChange={event => {
                          this.setState({
                            scatterRandomProbability: parseFloat(
                              event.target!.value,
                            ),
                          });
                        }}></input>
                      <br />
                      <br />
                      <button
                        className="w-full"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                        ) => {
                          e.preventDefault();
                          this.generateScatterRandom();
                        }}>
                        Generate Scatter Random
                      </button>
                      <br></br>
                    </div>
                  </form>
                  <br />
                  <div className="note-group">
                    <p className="text-black">Theme</p>

                    {/*<label style={{paddingBottom: '15px'}}>
                  This button allows you to change your theme of the Pathfinding
                  Visualizer. There are two modes.
                  <ul
                    style={{
                      listStyleType: 'disc',
                      paddingTop: '10px',
                    }}>
                    <li>
                      <b>Road Mode: </b> In this mode, you will be able to
                      visualize the program in a way that google maps would
                      allow a user to find the shortest distance to the location
                      that they want to go to.
                    </li>
                    <li>
                      <b>Default Mode: </b> This mode is the normal mode, where
                      the start node and finish node have no specific skins.
                      This would allow you to plainly visualize the program.{' '}
                    </li>
                  </ul>
                </label>*/}
                    <button
                      className="w-full"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                      ) => {
                        this.setState({
                          theme:
                            this.state.theme === 'default' ? 'road' : 'default',
                        });
                      }}>
                      {this.state.theme === 'default' ? 'Road' : 'Default'}{' '}
                      Mode!
                    </button>
                    <div className="pt-5 note-group">
                      <label
                        className="text-black flex justify-between items-center p-0 m-0"
                        htmlFor="formControlSpeed">
                        <span>Speed</span>
                        <p style={{color: 'black'}}>
                          {90 - this.state.animationSpeed}
                        </p>
                      </label>
                      <br />
                      <input
                        type="range"
                        min={5}
                        max={90}
                        step="1"
                        className="h-[4px] rounded-lg w-full bg-[#1F3247] accent-[#1F3247]"
                        id="formControlSpeed"
                        onChange={event => {
                          console.log(event.target!.value);
                          this.setState({
                            animationSpeed: 90 - parseInt(event.target!.value),
                          });
                        }}></input>
                      <br />
                    </div>
                  </div>
                </div>
              </TextArea>
            </div>
          </div>
        </div>

        <br></br>

        <Footer />
      </>
    );
  }

  ///////////////////////////////////////
  // FUNCTION: GENERATE SCATTER RANDOM
  ///////////////////////////////////////

  /**
   * Generates a scattered random wall setup with the specified probability.
   *
   * @returns void.
   */

  generateScatterRandom = (): void => {
    const {grid, isAnimationRunning, scatterRandomProbability} = this.state;
    if (!isAnimationRunning) {
      const walledMaze = scatterRandom(grid, scatterRandomProbability);
      this.setState({
        grid: walledMaze,
      });
    }
  };

  ///////////////////////////////////////
  // FUNCTION: GENERATE RANDOM MAZE
  ///////////////////////////////////////

  generateRandomMaze = (): void => {
    const {grid} = this.state;
    newMaze(grid);
  };
}
