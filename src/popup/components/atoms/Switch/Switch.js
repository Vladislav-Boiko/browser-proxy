import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import './Switch.css';
const Switch = ({ className, initialState, onChange }) => {
  const [isActive, setIsActive] = useState(initialState);
  useEffect(() => {
    setIsActive(initialState);
  }, [initialState]);
  return (
    <label
      className={cn('switch', className, {
        switch__checked: isActive,
      })}
    >
      <span className="switch__label">{isActive ? 'ON' : 'OFF'}</span>
      <input
        className="switch__checkbox"
        type="checkbox"
        checked={isActive}
        onChange={() => {
          onChange && onChange(!isActive);
          setIsActive(!isActive);
        }}
      />
    </label>
  );
};

export default Switch;
