///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React from 'react';
import Note from './Note';

///////////////////////////////////////
// COMPONENT: NODE TYPE BOXES
///////////////////////////////////////

const NodeTypeBoxes = (): JSX.Element => {
  return (
    <div>
      <div className="note-wrapper z-0 gap-0">
        <Note
          node="true"
          title="Unvisited Node"
          iconClass="node default"
          text="This is not the start, finish, or wall node; it is a node that has not yet been visited. This is normally how the probram begins, with none of the nodes visited."
        />
        <Note
          node="true"
          title="Start / Source Node"
          iconClass="node-start default"
          text='The start node is where the program begins its search; it will make that the primary node and work its way to the solution from there. This can be changed by pressing the "s" key over a node.'
        />
        <Note
          node="true"
          title="Finish / Target Node"
          iconClass="node-finish default"
          text='The finish node is the one that the program is looking for and will attempt to locate. It will give an error if it is unable to locate it. This can be changed by pressing the "f" key over a node.'
        />
        <Note
          node="true"
          title="Wall Node"
          iconClass="node-wall default"
          text="The wall nodes prevent the program from searching in that area; they can also be used to demonstrate how roads can prevent cars from entering a specific location."
        />
        <Note
          node="true"
          title="Visited Node"
          iconClass="node-visited default"
          text="The visited node is the node that the program has visited. It is the node that the program is currently on."
        />
        <Note
          node="true"
          title="Shortest Path Node"
          iconClass="node-shortest-path-right default"
          text="The node that the program has visited is the visited node. It's the node where the software looked for the target node previously."
        />
      </div>
    </div>
  );
};

///////////////////////////////////////
// EXPORTING NODE TYPE BOXES
///////////////////////////////////////

export default NodeTypeBoxes;
