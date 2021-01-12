import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Switch from 'atoms/Switch/Switch';

import './Header.css';
const Header = ({ options, initiallySelected, isOn, onChange, onToggle }) => {
  const [selectedId, setSelectedId] = useState(initiallySelected);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    setIsDisabled(!isOn);
  }, [isOn]);
  const select = (name) => {
    setSelectedId(name);
    onChange && onChange(name);
  };
  return (
    <nav className="navigation">
      <div className="navigation__actions wmax px4">
        {options.map(({ name }) => (
          <a
            key={name}
            className={cn('navigation__item label_medium', {
              navigation__item_selected: selectedId === name,
            })}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              select(name);
            }}
          >
            {name}
          </a>
        ))}
        <div className="switch-with-label">
          <span className="switch-with-label__label label_weak g1-color mr1">
            {!isDisabled ? 'Disable' : 'Enable'}
          </span>
          <Switch
            initialState={isDisabled}
            className="switch-with-label__switch"
            onChange={(isChecked) => {
              setIsDisabled(isChecked);
              onToggle && onToggle();
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
