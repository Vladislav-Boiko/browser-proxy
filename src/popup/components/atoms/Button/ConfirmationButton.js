import React, { useState } from 'react';
import cn from 'classnames';
import SuccessButton from 'atoms/Button/SuccessButton';

import './ConfirmationButton.css';
export default ({ children, confirmationMessage, ...otherProps }) => {
  const message = confirmationMessage || 'Are you sure?';
  const [confirming, setConfirming] = useState(false);
  const confirm = (value = true) => {
    setConfirming(value);
    if (value) {
      const timeout = setTimeout(() => setConfirming(false), 2800);
      return () => clearInterval(timeout);
    }
  };
  const onClick = (e) => {
    if (confirming) {
      setConfirming(false);
      return otherProps.onClick && otherProps.onClick(e);
    }
    confirm();
  };
  return (
    <SuccessButton
      {...otherProps}
      onClick={onClick}
      {...(confirming && { secondary: true, Icon: null })}
      className={cn(otherProps.className, {
        button_confirming: confirming,
      })}
    >
      {confirming ? message : children}
    </SuccessButton>
  );
};
