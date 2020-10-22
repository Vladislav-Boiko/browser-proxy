import React from 'react';
import cn from 'classnames';

import "./Button.css";
const Button = ({ children, onClick, className }) => (<button className={cn('button', className)}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }
}>{  children }</button>);

export default Button;