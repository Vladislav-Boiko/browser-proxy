import React, { useState } from 'react';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Node, {
  TYPES as TREE_TYPES,
  XHR_TYPES as XHR_TREE_TYPES,
} from './Nodes/index';

import './TreeView.css';
const TreeView = ({ nodes, onChange }) => {
  // TODO add initial state
  const [selectedId, select] = useState();
  const doSelect = (selected) => {
    select(selected);
    onChange && onChange(selected);
  };
  return (
    <ol className="treeView g7-bg px2 py3">
      <span className="label_medium g2-color px2">OVERRIDES</span>
      {nodes?.map((node) => (
        <Node
          {...node}
          selectedId={selectedId}
          select={doSelect}
          key={node.id}
        />
      ))}
      <Button
        Icon={Icons.Add}
        tretiary
        className="treeView_add-domain g6-bg mx2 my2"
      >
        Add Domain
      </Button>
    </ol>
  );
};

export const TYPES = TREE_TYPES;
export const XHR_TYPES = XHR_TREE_TYPES;
export default TreeView;
