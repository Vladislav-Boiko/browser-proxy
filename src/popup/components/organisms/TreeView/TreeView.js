import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import { v4 as uuid } from 'uuid';
import Node, {
  TYPES as TREE_TYPES,
  XHR_TYPES as XHR_TREE_TYPES,
} from './Nodes/index';
import './TreeView.css';
import { bringCurrentDomainToTop } from './utils';

// TODO: better solution for width auto.
const WIDTH = {
  closed: 72,
  open: 272,
};

const TreeView = ({
  nodes,
  onChange,
  addDomain,
  selectedId,
  currentDomain,
}) => {
  const [isMinified, setMinified] = useState(false);
  const [selected, select] = useState();
  nodes = isMinified
    ? nodes.map((node) => ({
        ...node,
        name: node.name ? node.name[0] : node.name,
      }))
    : nodes;
  nodes = bringCurrentDomainToTop(nodes, currentDomain);
  useEffect(() => {
    select(selectedId);
  }, [selectedId]);
  const doSelect = (clicked) => {
    select(clicked);
    onChange && onChange(clicked);
  };
  const [width, setWidth] = useState(WIDTH.open);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingKeyForResetting, setResizingKey] = useState(width);
  const resetResizing = (newWidth) => {
    setWidth(newWidth);
    setResizingKey(uuid());
  };
  return (
    <div className="treeView-container">
      <motion.ol
        className={cn('treeView g7-bg px2 py3', {
          treeView_minified: isMinified,
          treeView_md: width < 165,
        })}
        animate={isMinified ? 'closed' : 'open'}
        transition={{
          duration: 0.8,
          type: 'spring',
        }}
        variants={{
          open: { width: `${width}px` },
          closed: { width: `${WIDTH.closed}px` },
        }}
      >
        <span
          className={cn('treeView__header label_medium g2-color px2 mb2', {
            treeView__header_md: width < 210,
            treeView__header_sm: width < 180,
            treeView__header_xs: width < 144,
          })}
        >
          OVERRIDES
        </span>
        <Button
          Icon={Icons.Collapse}
          className={cn('treeView__show-hide', {
            'treeView__show-hide_minified': isMinified,
          })}
          onClick={() => {
            setMinified(!isMinified);
            let newWidth = width;
            if (!isMinified) {
              newWidth = WIDTH.closed;
            } else if (newWidth < WIDTH.open) {
              newWidth = WIDTH.open;
            }
            resetResizing(newWidth);
          }}
        ></Button>
        {nodes?.map((node) => (
          <Node
            {...node}
            selectedId={selected}
            select={doSelect}
            key={node.id}
            currentDomain={currentDomain}
          />
        ))}
        <Button
          Icon={Icons.Add}
          tretiary
          className="treeView__add-domain g7-bg my2 px2"
          onClick={addDomain}
        >
          Add Domain
        </Button>
      </motion.ol>
      <motion.button
        key={resizingKeyForResetting}
        className={cn('treeView__resize-handler', {
          'treeView__resize-handler_dragged': isResizing,
          'treeView__resize-handler_minified': isMinified,
        })}
        style={{ left: `${width}px` }}
        drag="x"
        dragMomentum={false}
        dragElastic={0.2}
        onDragStart={() => setIsResizing(true)}
        onDragEnd={(e, info) => {
          const newWidth = width + info.offset.x;
          if (newWidth < 144) {
            if (!isMinified) {
              setMinified(true);
            }
            resetResizing(WIDTH.closed);
            setWidth(WIDTH.closed);
          } else {
            if (isMinified) {
              setMinified(false);
            }
            resetResizing(newWidth);
          }
          setIsResizing(false);
        }}
      ></motion.button>
    </div>
  );
};

export const TYPES = TREE_TYPES;
export const XHR_TYPES = XHR_TREE_TYPES;
export default TreeView;
