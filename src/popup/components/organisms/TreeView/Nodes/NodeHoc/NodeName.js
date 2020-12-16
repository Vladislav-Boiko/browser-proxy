import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { updateNode } from 'store/nodes/actions';

import './NodeName.css';
const NodeName = ({ id, name, className, isUnsaved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const dispatch = useDispatch();
  const updateValue = (value) => dispatch(updateNode({ id, name: value }));
  let inputRef = null;
  useEffect(() => {
    setValue(name);
    inputRef && inputRef.focus();
  }, [name]);
  if (isEditing) {
    return (
      <input
        className={'nodeName__input'}
        type="text"
        value={value}
        ref={(theInput) => (inputRef = theInput)}
        onChange={(e) => updateValue(e.target.value)}
        onBlur={() => setIsEditing(false)}
        size={`${name.length}`}
      />
    );
  }
  return (
    <span
      className={cn('nodeName__name ml1', className, {
        nodeName__name_unsaved: isUnsaved,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      {name}
    </span>
  );
};

export default NodeName;
