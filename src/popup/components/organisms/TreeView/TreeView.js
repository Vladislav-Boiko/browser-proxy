import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Node, {
  TYPES as TREE_TYPES,
  XHR_TYPES as XHR_TREE_TYPES,
} from './Nodes/index';

import './TreeView.css';
const TreeView = ({ nodes, onChange, addDomain, selectedId }) => {
  const [isMinified, setMinified] = useState(false);
  const [selected, select] = useState();
  nodes = isMinified
    ? nodes.map((node) => ({
        ...node,
        name: node.name ? node.name[0] : node.name,
      }))
    : nodes;
  useEffect(() => {
    select(selectedId);
  }, [selectedId]);
  const doSelect = (clicked) => {
    select(clicked);
    onChange && onChange(clicked);
  };
  return (
    <ol
      className={cn('treeView g7-bg px2 py3', {
        treeView_minified: isMinified,
      })}
    >
      <span className="treeView__header label_medium g2-color px2 mb2">
        OVERRIDES
      </span>
      <Button
        Icon={Icons.Collapse}
        tretiary
        className={cn('treeView__show-hide g7-bg', {
          'treeView__show-hide_minified': isMinified,
        })}
        onClick={() => setMinified(!isMinified)}
      ></Button>
      {nodes?.map((node) => (
        <Node {...node} selectedId={selected} select={doSelect} key={node.id} />
      ))}
      <Button
        Icon={Icons.Add}
        tretiary
        className="treeView__add-domain g7-bg my2 px2"
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
