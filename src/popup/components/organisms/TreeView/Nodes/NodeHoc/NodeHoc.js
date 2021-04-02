import React from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import mergeRefs from 'react-merge-refs';
import { DND_TYPES } from '../../TreeViewDnD';

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
  return (
    <button
      ref={mergeRefs([drag, drop])}
      className={cn(className, 'treeView__row', {
        treeView__row_selected: selectedId === id,
        node__row_dragged: isDragging,
        node__row_dropping: isOver,
      })}
      onClick={() => {
        select(id);
        onClick && onClick();
      }}
    >
      {children}
    </button>
  );
};

export default TreeView;
