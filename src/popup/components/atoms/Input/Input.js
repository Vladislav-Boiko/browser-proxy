import React from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';

import './Input.css';

const Input = ({
  value,
  className,
  onChange,
  label,
  icon,
  validationError,
  ...otherProps
}) => {
  return (
    <label className={cn('input-label', className)}>
      <span className="label_weak g1-color">
        {label}
        {validationError && (
          <span className="input-label__validation accent-color">
            <Icons.Danger className="input-label__validation-icon icon_md mr1" />
            {validationError}
          </span>
        )}
      </span>
      <input
        className={cn('input label_weak c5-bg px2 py1', {
          input_invalid: !!validationError,
        })}
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
          'cross-button_invalid': !!validationError,
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
