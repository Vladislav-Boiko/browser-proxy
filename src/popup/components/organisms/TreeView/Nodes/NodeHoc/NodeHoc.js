import React from 'react';
import cn from 'classnames';

const TreeView = ({ id, select, selectedId, className, children, onClick }) => {
  return (
    <button
      className={cn(className, 'treeView__row', {
        treeView__row_selected: selectedId === id,
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
