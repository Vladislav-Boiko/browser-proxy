import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';

import './Dropdown.css';

const viewForValue = (options, value) => {
  const selectedOption = options.find((option) => option.value === value);
  if (selectedOption) {
    return selectedOption.view || selectedOption.value;
  }
  return '';
};

const Dropdown = ({
  options,
  label,
  onChange,
  initialState,
  isUnsaved = false,
}) => {
  const [value, setValue] = useState(options[0]);
  useEffect(() => {
    setValue(initialState);
  }, [initialState]);
  return (
    <label
      className={cn('dropdown', {
        dropdown_unsaved: isUnsaved,
      })}
    >
      <span className="dropdown__label label_weak g1-color">{label}</span>
      <div className="dropdown__view c5-bg label_weak">
        {viewForValue(options, value)}
        <Icons.Chevron className="icon_sm dropdown__chevron" />
        <select
          className="dropdown__select"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
        >
          {options.map(({ name, value }) => (
            <option value={value} key={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};

export default Dropdown;
