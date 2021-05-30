import React, { useState } from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';

import './SuccessButton.css';
export default (Button) => ({ children, ...otherProps }) => {
  const [showingSuccess, setShowingSuccess] = useState(false);
  const showSuccess = (value = true) => {
    setShowingSuccess(value);
    if (value) {
      const timeout = setTimeout(() => setShowingSuccess(false), 2800);
      return () => clearInterval(timeout);
    }
  };
  const onClick = (e) => {
    const result = otherProps.onClick && otherProps.onClick(e);
    if (result) {
      showSuccess();
    }
  };
  return showingSuccess ? (
    <Button
      {...otherProps}
      secondary
      iconClass="additional-icon"
      className={cn('success-button', otherProps.className)}
      showSuccess={showSuccess}
    >
      <Icons.Success className="icon-success icon_lg ml1 animate disappear" />
      {children}
    </Button>
  ) : (
    <Button {...otherProps} onClick={onClick} showSuccess={showSuccess}>
      {children}
    </Button>
  );
};
