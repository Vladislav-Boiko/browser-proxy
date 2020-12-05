import React from 'react';
import cn from 'classnames';

import './Button.css';
const Button = ({
  children,
  onClick,
  className,
  Icon,
  primary,
  secondary,
  tretiary,
}) => {
  return (
    <button
      className={cn('button label_medium py1 px3', className, {
        'primary white-color primary-bg': primary,
        'secondary white-bg primary-color': secondary,
        'tretiary white-bg primary-color': tretiary,
      })}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
    >
      {Icon && <Icon className={'icon_md mr1'} />}
      {children}
    </button>
  );
};

export default Button;
