import React, { useState, useEffect } from 'react';
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
  isUnsaved,
  reset,
  ...otherProps
}) => {
  const [validationError, setValidationError] = useState(
    validate && value ? validate(value) : '',
  );
  useEffect(() => {
    setValidationError(validate && value ? validate(value) : '');
  });
  const [validationTimeout, setValidationTimeout] = useState(null);
  return (
    <label className={cn('input-label', className)}>
      <span
        className={cn('label_weak g1-color input-label__label', labelClassName)}
      >
        {label}
        {validationError && (
          <span className="input-label__validation accent-color">
            <Icons.Danger className="input-label__validation-icon icon_md mr1" />
            {validationError}
          </span>
        )}
      </span>
      <label
        title="Undo changes"
        className={cn('input__revert', {
          input__revert_enabled: isUnsaved,
          'input__revert_with-label': !!label,
          input__revert_active: !!reset,
        })}
        disabled={!reset}
      >
        <span className="input__revert_label-text">
          Undo changes in {label} input
        </span>
        <Icons.Reset className="icon_sm" />
        <button onClick={() => reset && reset()}>Revert</button>
      </label>
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
        size="1"
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
