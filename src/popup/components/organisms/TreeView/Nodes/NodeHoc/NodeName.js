import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import './NodeName.css';
const NodeName = ({ name, className, isUnsaved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  let inputRef = null;
  useEffect(() => {
    inputRef && inputRef.focus();
  });
  if (isEditing) {
    return (
      <input
        className={'nodeName__input'}
        type="text"
        value={value}
        ref={(theInput) => (inputRef = theInput)}
        onChange={(e) => setValue(e.target.value)}
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
