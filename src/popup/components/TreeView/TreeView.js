import React, { useState } from 'react';
import Node from './Nodes/index';

import './TreeView.css';
const TreeView = ({ nodes }) => {
  // TODO add initial state
  const [selectedId, select] = useState();
  return (
    <ol className="treeView g7-bg px2 py3">
      <span className="label_medium g2-color px2">OVERRIDES</span>
      {nodes.map((node) => (
        <Node {...node} selectedId={selectedId} select={select} key={node.id} />
      ))}
    </ol>
  );
};

export default TreeView;
