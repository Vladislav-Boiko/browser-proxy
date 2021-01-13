import React, { useState } from 'react';
import cn from 'classnames';
import Node from '../index';
import NodeHoc from '../NodeHoc/NodeHoc';
import Icons from 'atoms/Icons/Icons';
import NodeName from '../NodeHoc/NodeName';
import { motion } from 'framer-motion';
import { animateHeight } from 'atoms/animations/animations';

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
        {nodes ? (
          <Icons.Chevron
            className={cn('icon_sm folder__chevron', {
              folder__chevron_collapsed: isCollapsed,
            })}
          />
        ) : (
          ''
        )}
        <Icons.Folder className="icon_md folder__icon" />
        <NodeName id={otherProps.id} name={name} className="folder__name" />
      </NodeHoc>
      <motion.ol className={cn('mx2')} {...animateHeight(!isCollapsed)}>
        {nodes?.map((node) => (
          <Node {...otherProps} {...node} key={node.id} />
        ))}
      </motion.ol>
    </li>
  );
};

export default Folder;
