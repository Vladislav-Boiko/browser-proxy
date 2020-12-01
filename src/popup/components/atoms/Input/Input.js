import React from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';

import './Input.css';

const Input = ({ value, className, onChange, label, icon, ...otherProps }) => {
  return (
    <label className={cn('input-label', className)}>
      <span className="label_weak g1-color">{label}</span>
      <input
        className="input label_weak c5-bg px2 py1"
        type="text"
        {...otherProps}
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      ></input>
      <label
        className={cn('cross-button input-icon', {
          'cross-button_shown': !!value && !icon,
        })}
      >
        <span className="label__text_hidden">Clear input {label}</span>
        <button
          className="input__cross px2"
          onClick={() => {
            onChange && onChange('');
          }}
        >
          <Icons.Cross className="icon_sm" />
        </button>
      </label>
      {icon && <div className="input-icon px2">{icon}</div>}
    </label>
  );
};

export default Input;
