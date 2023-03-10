import React from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { mergeRefs } from 'react-merge-refs';
import { DND_TYPES } from '../../TreeViewDnD';
import { TYPES } from 'organisms/TreeView/Nodes/index';
import Icons from 'atoms/Icons/Icons';

import './NodeHoc.css';
const TreeView = ({
  id,
  select,
  selectedId,
  className,
  children,
  onClick,
  ...otherProps
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_TYPES.OVERRIDE,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DND_TYPES.OVERRIDE,
      drop: (item) =>
        otherProps.moveNode && otherProps.moveNode({ from: item.id, to: id }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );
  let ref = drop;
  if (otherProps.type !== TYPES.DOMAIN) {
    ref = mergeRefs([drag, drop]);
  }
  return (
    <button
      ref={ref}
      className={cn(className, 'treeView__row node-hoc', {
        treeView__row_selected: selectedId === id,
        'node-hoc_dragged': isDragging,
        'node-hoc_dropping': isOver,
      })}
      onClick={() => {
        select(id);
        onClick && onClick();
      }}
    >
      {!otherProps.isOn && otherProps.type !== TYPES.DOMAIN && (
        <Icons.Disabled className="icon_md treeView__node-icon_disabled" />
      )}
      {children}
    </button>
  );
};

export default TreeView;
