import React, { useState, useEffect } from 'react';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Node, {
  TYPES as TREE_TYPES,
  XHR_TYPES as XHR_TREE_TYPES,
} from './Nodes/index';

import './TreeView.css';
const TreeView = ({ nodes, onChange, addDomain, selectedId }) => {
  const [selected, select] = useState();
  useEffect(() => {
    select(selectedId);
  });
  const doSelect = (clicked) => {
    select(clicked);
    onChange && onChange(clicked);
  };
  return (
    <ol className="treeView g7-bg px2 py3">
      <span className="label_medium g2-color px2">OVERRIDES</span>
      {nodes?.map((node) => (
        <Node {...node} selectedId={selected} select={doSelect} key={node.id} />
      ))}
      <Button
        Icon={Icons.Add}
        tretiary
        className="treeView_add-domain g7-bg my2 px2"
        onClick={addDomain}
      >
        Add Domain
      </Button>
    </ol>
  );
};

export const TYPES = TREE_TYPES;
export const XHR_TYPES = XHR_TREE_TYPES;
export default TreeView;
