import React from 'react';
import cn from 'classnames';

import './Button.css';
const Button = ({ children, onClick, className, primary, secondary }) => {
  return (
    <button
      className={cn('button label_medium py1 px3', className, {
        'primary white-color primary-bg': primary,
        'secondary white-bg primary-color': secondary,
      })}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
