import React from 'react';
import cn from 'classnames';

import './Tabs.css';
const Tabs = ({ className, tabs, onSelect, selectedTab }) => {
  return (
    <ul className={cn(className, 'tabs ffr')}>
      {tabs.map((tab) => (
        <li
          className={cn('tab', {
            tab_selected: selectedTab === tab?.id,
          })}
        >
          <button className="label_weak" onClick={() => onSelect(tab.id)}>
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
