import React from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';
import TextareaAutosize from 'react-textarea-autosize';

import './Input.css';
import { ResetButton } from 'atoms/Button/ResetButton';
import SuccessButton from 'atoms/Button/SuccessButton';
import browser from 'src/common/browser';
import PrismInput from '../../molecules/Body/PrismInput/PrismInput';

const InputType = ({ multiline, className, ...otherProps }) => {
  if (!multiline) {
    return (
      <input
        {...otherProps}
        value={otherProps.value ?? ''}
        className={cn(className, 'c5-bg')}
      />
    );
  }
  if (otherProps.language) {
    return (
      <div {...otherProps} className={cn(className, 'g7-bg prism-input')}>
        <PrismInput
          language={otherProps.language}
          code={otherProps.value ?? ''}
          onChange={otherProps.onChange}
        />
      </div>
    );
  }
  return (
    <TextareaAutosize
      minRows="3"
      maxRows="12"
      {...otherProps}
      className={cn(className, 'c5-bg')}
    />
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
  const validationError = value && validate ? validate(value) : '';
  return (
    <label className={cn('input-label', className)}>
      <span
        className={cn('label_weak g1-color input-label__label', labelClassName)}
      >
        {label}
      </span>
      <ResetButton
        isUnsaved={isUnsaved}
        reset={reset}
        label={`Undo changes in ${label} chunk`}
        isShifted={!!label}
      />
      <InputType
        className={cn('input label_weak px2 py1', {
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
      {multiline && (
        <label
          className={cn('copy-button input-icon', {
            'copy-button_label': !!validationError,
          })}
        >
          <span className="label__text_hidden">Copy value {label}</span>
          {!browser?.devtools && (
            <SuccessButton
              key={value || 'copy'}
              className="copy-value px2"
              tretiary
              onClick={() => {
                navigator.permissions
                  .query({ name: 'clipboard-write' })
                  .then((result) => {
                    (result.state === 'granted' || result.state === 'prompt') &&
                      navigator.clipboard.writeText(value);
                  });
                return true;
              }}
              Icon={Icons.Duplicate}
              iconLeft={true}
            >
              copy
            </SuccessButton>
          )}
        </label>
      )}
      {icon && <div className="input-icon px2">{icon}</div>}
      <span
        className={cn('label_weak g1-color input-label__label', labelClassName)}
      >
        {validationError && (
          <span className="input-label__validation accent-color">
            <Icons.Danger className="input-label__validation-icon icon_md mr1" />
            {validationError}
          </span>
        )}
      </span>
    </label>
  );
};

export default Input;
