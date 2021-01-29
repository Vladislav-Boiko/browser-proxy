import React, { useState } from 'react';
import cn from 'classnames';
import Node from '../index';
import NodeHoc from '../NodeHoc/NodeHoc';
import Icons from 'atoms/Icons/Icons';
import NodeName from '../NodeHoc/NodeName';
import { motion } from 'framer-motion';
import { animateHeight } from 'atoms/animations/animations';

import './Domain.css';
const Domain = ({ name, nodes, className, ...otherProps }) => {
  // TODO: initial value based on the site we are at
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isCurrent = otherProps.id === otherProps.currentDomain;
  return (
    <li>
      <NodeHoc
        {...otherProps}
        onClick={() => {
          if (otherProps.selectedId === otherProps.id) {
            setIsCollapsed(!isCollapsed);
          }
        }}
        className={cn(className, { domain_current: isCurrent })}
      >
        {nodes && nodes.length ? (
          <Icons.Chevron
            className={cn('icon_sm domain__chevron', {
              domain__chevron_collapsed: isCollapsed,
            })}
          />
        ) : (
          ''
        )}
        <Icons.Domain className="icon_md domain__icon" />
        <NodeName id={otherProps.id} name={name} />
      </NodeHoc>
      <motion.ol className={cn('ml2')} {...animateHeight(!isCollapsed)}>
        {nodes?.map((node) => (
          <Node {...otherProps} {...node} key={node.id} />
        ))}
      </motion.ol>
    </li>
  );
};

export default Domain;
