import React, { useState } from 'react';
import cn from 'classnames';
import Node from '../index';
import NodeHoc from '../NodeHoc/NodeHoc';
import Icons from 'atoms/Icons/Icons';
import NodeName from '../NodeHoc/NodeName';

import './Folder.css';
const Folder = ({ name, nodes, ...otherProps }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <li>
      <NodeHoc
        {...otherProps}
        onClick={() => {
          if (otherProps.selectedId === otherProps.id) {
            setIsCollapsed(!isCollapsed);
          }
        }}
      >
        <Icons.Folder className="icon_md folder__icon" />
        <NodeName name={name} className="folder__name" />
      </NodeHoc>
      <ol
        className={cn('mx2', {
          folder__children_collapsed: isCollapsed,
        })}
      >
        {nodes?.map((node) => (
          <Node {...otherProps} {...node} key={node.id} />
        ))}
      </ol>
    </li>
  );
};

export default Folder;
