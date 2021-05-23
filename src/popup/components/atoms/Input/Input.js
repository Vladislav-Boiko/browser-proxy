import React from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';
import TextareaAutosize from 'react-textarea-autosize';

import './Input.css';
import { ResetButton } from 'atoms/Button/ResetButton';

const InputType = ({ multiline, ...otherProps }) => {
  return !multiline ? (
    <input {...otherProps} value={otherProps.value || ''} />
  ) : (
    <TextareaAutosize minRows="3" maxRows="12" {...otherProps} />
  );
};

const Input = ({
  value,
  labelClassName,
  className,
  onChange,
  label,
  icon,
  validate,
  multiline = false,
  isUnsaved,
  reset,
  ...otherProps
}) => {
  delete otherProps.isUnsaved;
  const validationError = value && validate ? validate(value) : '';
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
      <ResetButton
        isUnsaved={isUnsaved}
        reset={reset}
        label={`Undo changes in ${label} chunk`}
        isShifted={!!label}
      />
      <InputType
        className={cn('input label_weak c5-bg px2 py1', {
          input_invalid: !!validationError,
          input_multiline: multiline,
        })}
        multiline={multiline}
        type="text"
        {...otherProps}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        {!otherProps.disabled && (
          <button className="input__cross px2" onClick={() => onChange('')}>
            <Icons.Cross className="icon_sm" />
          </button>
        )}
      </label>
      {icon && <div className="input-icon px2">{icon}</div>}
    </label>
  );
};

export default Input;
