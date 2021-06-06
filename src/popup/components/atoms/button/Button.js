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
  iconLeft,
  iconClass,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      className={cn(
        'button label_medium py1 px3',
        {
          'primary white-color primary-bg': primary,
          'secondary white-bg primary-color': secondary,
          'tretiary white-bg primary-color': tretiary,
          button_disabled: otherProps.disabled,
        },
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
    >
      {!iconLeft && Icon && <Icon className={cn(iconClass, 'icon_md mr1')} />}
      {children}
      {iconLeft && Icon && <Icon className={cn(iconClass, 'icon_md ml1')} />}
    </button>
  );
};

export default Button;
