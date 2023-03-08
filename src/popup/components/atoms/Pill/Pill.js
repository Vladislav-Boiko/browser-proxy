import React from 'react';
import cn from 'classnames';

import './Pill.css';
const Pill = ({ text, className, onClick }) => {
  return onClick ? (
    <button
      onClick={onClick}
      className={cn(
        'pill pill_button label_strong primary-color c5-bg',
        className,
      )}
    >
      {text}
    </button>
  ) : (
    <span className={cn('pill label_strong primary-color c5-bg', className)}>
      {text}
    </span>
  );
};

export default Pill;
