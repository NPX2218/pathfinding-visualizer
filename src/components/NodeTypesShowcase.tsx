///////////////////////////////////////
// IMPORTING MODULES
///////////////////////////////////////

import React from 'react';

///////////////////////////////////////
// COMPONENT: NODE TYPES SHOWCASE
///////////////////////////////////////

const NodeTypesShowcase = (): JSX.Element => {
  const nodeTypes: {title: string; className: string}[] = [
    {title: 'Unvisited', className: 'node default'},
    {title: 'Start', className: 'node-start default'},
    {title: 'Finish', className: 'node-finish default'},
    {title: 'Wall', className: 'node-wall default'},
    {title: 'Visited', className: 'node-visited default'},
    {title: 'Path', className: 'node-shortest-path-right default'},
  ];
  return (
    <div className="flex flex-col items-center p-5 pb-0">
      <div className="flex flex-wrap justify-center gap-6">
        {nodeTypes.map((node, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-xs font-medium">
            <div
              className={`${node.className} w-6 h-6 border border-blue-200 flex items-center justify-center rounded-sm mb-1`}
            />
            <span>{node.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

///////////////////////////////////////
// EXPORTING NODE TYPES SHOWCASE
///////////////////////////////////////

export default NodeTypesShowcase;
