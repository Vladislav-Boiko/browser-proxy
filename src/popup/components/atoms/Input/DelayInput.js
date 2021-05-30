import React, { useState, useEffect } from 'react';
import Icons from '../Icons/Icons';
import Input from './Input';
import cn from 'classnames';

const toMsString = (value) => `${(value + '').split('ms').shift()}ms`;
const fromMsString = (value) =>
  Number.parseInt(/(\d*)m?s?$/.exec(value)[1]) || 0;
const isValid = (value) => /\d*$/.test(value);

const DelayInput = ({ onChange, ...otherProps }) => {
  let value = otherProps.value;
  if (otherProps.value === undefined) {
    value = '200ms';
  }
  const [valueOnFocus, setValueOnFocus] = useState(value);
  const [isAnimate, setAnimate] = useState(false);
  const setValue = (newValue) => {
    onChange && onChange(newValue);
  };
  return (
    <Input
      icon={
        <Icons.Watch className={cn('icon_md', { animate_watch: isAnimate })} />
      }
      label="Delay"
      {...otherProps}
      className={cn('input_delay', otherProps.className)}
      value={value}
      onChange={(newValue) => {
        if (isValid(newValue)) {
          setValue(fromMsString(newValue));
        }
      }}
      onBlur={() => {
        setValue(toMsString(value));
        setAnimate(valueOnFocus !== value);
      }}
      onFocus={() => {
        setValue(fromMsString(value));
        setAnimate(false);
        setValueOnFocus(fromMsString(value));
      }}
    />
  );
};

export default DelayInput;
