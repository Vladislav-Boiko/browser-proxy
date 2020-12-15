import React, { useState } from 'react';
import cn from 'classnames';
import Node from '../index';
import NodeHoc from '../NodeHoc/NodeHoc';
import Icons from 'atoms/Icons/Icons';
import NodeName from '../NodeHoc/NodeName';

import './Domain.css';
const Domain = ({ name, nodes, ...otherProps }) => {
  // TODO: initial value based on the site we are at
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
        <Icons.Domain className="icon_md domain__icon" />
        <NodeName name={name} />
      </NodeHoc>
      <ol
        className={cn('ml2', {
          domain__children_collapsed: isCollapsed,
        })}
      >
        {nodes?.map((node) => (
          <Node {...otherProps} {...node} key={node.id} />
        ))}
      </ol>
    </li>
  );
};

export default Domain;
