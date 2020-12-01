import React from 'react';
import cn from 'classnames';

import './Pill.css';
const Pill = ({ text, className }) => {
  return (
    <span className={cn('pill label_strong primary-color c5-bg', className)}>
      {text}
    </span>
  );
};

export default Pill;
