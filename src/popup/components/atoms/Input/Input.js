import React, { useState } from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';
import TextareaAutosize from 'react-textarea-autosize';

import './Input.css';

const InputType = ({ multiline, ...otherProps }) =>
  !multiline ? (
    <input {...otherProps} />
  ) : (
    <TextareaAutosize minRows="3" {...otherProps} />
  );

const Input = ({
  value,
  labelClassName,
  className,
  onChange,
  label,
  icon,
  validate,
  multiline,
  ...otherProps
}) => {
  const [validationError, setValidationError] = useState(
    validate ? validate(value) : '',
  );
  const [validationTimeout, setValidationTimeout] = useState(null);
  return (
    <label className={cn('input-label', className)}>
      <span className={cn('label_weak g1-color', labelClassName)}>
        {label}
        {validationError && (
          <span className="input-label__validation accent-color">
            <Icons.Danger className="input-label__validation-icon icon_md mr1" />
            {validationError}
          </span>
        )}
      </span>
      <InputType
        className={cn('input label_weak c5-bg px2 py1', {
          input_invalid: !!validationError,
          input_multiline: multiline,
        })}
        multiline={multiline}
        type="text"
        {...otherProps}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          if (validate) {
            clearTimeout(validationTimeout);
            const newTimeout = setTimeout(
              () => setValidationError(validate(newValue)),
              300,
            );
            setValidationTimeout(newTimeout);
          }
          onChange && onChange(newValue);
        }}
      />
      <label
        className={cn('cross-button input-icon', {
          'cross-button_shown': !!value && !icon,
          'cross-button_invalid': !!validationError,
          'cross-button_no-label': !label,
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
