import React, { useState } from 'react';
import cn from 'classnames';
import Switch from '../atoms/Switch/Switch';

import './Header.css';
const Header = ({ options, initiallySelected, onChange }) => {
  const [selectedId, setSelectedId] = useState(initiallySelected);
  const [isDisabled, setIsDisabled] = useState(false);
  const select = (name) => {
    setSelectedId(name);
    onChange && onChange(name);
  };
  return (
    <nav className="naivgation pl4">
      {options.map(({ name }) => (
        <a
          key={name}
          className={cn('navigation__item label_medium mr4', {
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
      <div className="switch-with-label mr4">
        <span className="switch-with-label__label label_weak g1-color mr1">
          {!isDisabled ? 'Disable' : 'Enable'}
        </span>
        <Switch
          className="switch-with-label__switch"
          onChange={(isChecked) => setIsDisabled(isChecked)}
        />
      </div>
    </nav>
  );
};

export default Header;
