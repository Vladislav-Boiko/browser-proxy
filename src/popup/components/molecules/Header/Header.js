import React, { useState, useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { mergeRefs } from 'react-merge-refs';
import cn from 'classnames';
import Switch from 'atoms/Switch/Switch';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';

import './Header.css';
const Header = ({ options, initiallySelected, isOn, onChange, onToggle }) => {
  const [isMinified, setMinified] = useState(true);
  const [selectedId, setSelectedId] = useState(initiallySelected);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    setIsDisabled(!isOn);
  }, [isOn]);
  const select = (name) => {
    setSelectedId(name);
    onChange && onChange(name);
  };
  useEffect(() => {
    setSelectedId(initiallySelected);
  }, [initiallySelected]);
  const { observe, currentBreakpoint } = useDimensions({
    breakpoints: {
      column: 0,
      row: ((options?.length || 0) + 1.5) * 100,
    },
    updateOnBreakpointChange: true,
  });
  const { observe: observeFont, currentBreakpoint: currentFontBreakpoint } =
    useDimensions({
      breakpoints: {
        XS: 0,
        S: 300,
        M: 400,
        L: 500,
        XL: 600,
      },
      updateOnBreakpointChange: true,
    });
  return (
    <nav
      className={cn('navigation', currentBreakpoint, {
        'navigation_column-minified':
          currentBreakpoint === 'column' && isMinified,
      })}
      ref={mergeRefs([observe, observeFont])}
    >
      <div className="navigation__actions wmax px4">
        {options.map(({ name }) => (
          <a
            key={name}
            className={cn(
              'navigation__item label_medium',
              currentFontBreakpoint,
              {
                navigation__item_selected: selectedId === name,
              },
            )}
            href={`#${name}`}
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
        {currentBreakpoint === 'column' && (
          <Button
            Icon={Icons.Collapse}
            className={cn('menu__show-hide', {
              'menu__show-hide_minified': isMinified,
            })}
            onClick={() => {
              setMinified(!isMinified);
            }}
          >
            {isMinified && 'menu'}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
