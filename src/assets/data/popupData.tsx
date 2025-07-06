import React from 'react';
import NodeTypeBoxes from '../../components/NodeTypeBoxes';

export const popupData = [
  {
    page: 1,
    title: 'Welcome to the Pathfinding Visualizer!',
    description:
      "Here is a short tutorial that will walk you through what a pathfinding visualizer is. You can press the 'x' in the right hand corner at any time during this tutorial. A pathfinding algorithm's primary goal is to identify the shortest route between two nodes / points on a graph. There are different algorithm that can be used to identify the shortest route.",
    image: require('../images/path.png'),
    imageWidth: 25,
    imageHeight: 50,
  },
  {
    page: 2,
    title: 'How can I place walls?',
    description:
      'To place walls, you can press the box that you would like to put a wall on. If a wall has already been placed then the wall will turn back into an unvisited node. The wall nodes prevent the program from searching in that area; they can also be used to demonstrate how sidewalks can break your route.',
    image: require('../images/wall-placement.gif'),
    imageWidth: 15,
    imageHeight: 40,
  },
  {
    page: 3,
    title: 'Different Visualization Modes',
    description:
      'There are two different ways to visualize the algorithm. The first is to see it normally. With no change whatsoever. However, the second way to see it is in the road mode. Where you are able to see a car moving to find its shortest path.',
    image: require('../images/wall-placement-road.gif'),
    imageWidth: 3.75,
    imageHeight: 10,
  },
  {
    page: 4,
    title: 'Maze Generation',
    description:
      'It is possible to also generate a maze to visualize how the alogrithm is able to find itself out of a maze. This can be done by pressing the "Generate Maze" button on the navbar.',
    image: require('../images/maze.png'),
    imageWidth: 3.75,
    imageHeight: 10,
  },
  {
    page: 5,
    title: 'Node Types',
    component: <NodeTypeBoxes />,
  },
];
