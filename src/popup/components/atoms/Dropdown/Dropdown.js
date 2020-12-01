import React, { useState } from 'react';
import Icons from '../Icons/Icons';
import cn from 'classnames';

import './Dropdown.css';

const viewForValue = (options, value) => {
  const selectedOption = options.find((option) => option.value === value);
  if (selectedOption) {
    return selectedOption.view || selectedOption.value;
  }
  return '';
};

const Dropdown = ({ options, label, initialState }) => {
  const [value, setValue] = useState(initialState);
  return (
    <label className="dropdown">
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
