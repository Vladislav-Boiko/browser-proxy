import React from 'react';
import cn from 'classnames';
import Input from '../../atoms/Input/Input';
import Switch from '../../atoms/Switch/Switch';

import './UrlParameter.css';
const URLParameter = ({
  keyName,
  value,
  isDisabled,
  setKeyName,
  setValue,
  toggleDisabled,
  remove,
  hasLabels,
}) => {
  const maybeRemove = (value, key) => !value && !key && remove && remove();
  return (
    <div className="urlParameter">
      <Switch
        className={cn('urlParamter__switch', { mt3: hasLabels })}
        onChange={toggleDisabled}
        initialState={true}
      />
      <Input
        className="queryParamterKey"
        label={hasLabels && 'Key'}
        value={keyName || ''}
        onChange={(newValue) => {
          setKeyName(newValue);
          maybeRemove(newValue, value);
        }}
        disabled={isDisabled}
      />
      <Input
        className="queryParamterValue"
        label={hasLabels && 'Value'}
        value={value || ''}
        onChange={(newValue) => {
          setValue(newValue);
          maybeRemove(newValue, keyName);
        }}
        disabled={isDisabled}
      />
    </div>
  );
};

export default URLParameter;
