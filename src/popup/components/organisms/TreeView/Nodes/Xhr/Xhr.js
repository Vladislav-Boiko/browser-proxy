import React from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import NodeHoc from '../NodeHoc/NodeHoc';
import NodeName from '../NodeHoc/NodeName';
import mergeRefs from 'react-merge-refs';
import { DND_TYPES } from '../../TreeViewDnD';
import './Xhr.css';

const typeToText = (type) => {
  if (type === 'DELETE') {
    return 'DEL';
  }
  if (type === 'OPTIONS') {
    return 'OPT';
  }
  if (type === 'TRACE') {
    return 'TRAC';
  }
  if (type === 'PATCH') {
    return 'PTCH';
  }
  return type;
};

const Xhr = ({ type, name, isUnsaved, moveNode, ...otherProps }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_TYPES.OVERRIDE,
    item: { id: otherProps.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DND_TYPES.OVERRIDE,
      drop: (item) =>
        moveNode && moveNode({ from: item.id, to: otherProps.id }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );
  return (
    <li
      ref={mergeRefs([drag, drop])}
      className={cn('node__row', {
        node__row_dragged: isDragging,
        node__row_dropping: isOver,
      })}
    >
      <NodeHoc {...otherProps}>
        <span className="xhrNode__type mr1 g4-color">{typeToText(type)}</span>
        <NodeName
          id={otherProps.id}
          className="xhrNode__name"
          name={name}
          isUnsaved={isUnsaved}
        />
      </NodeHoc>
    </li>
  );
};

export default Xhr;
