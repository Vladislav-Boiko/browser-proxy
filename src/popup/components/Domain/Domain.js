import React, { useState } from 'react';
import cn from 'classnames';
import StandaloneOverride from '../../containers/StandaloneOverride/StandaloneOverride';
import RequestsList from '../ReqeustsList/RequestsList';
import './Domain.css';

const MENU_ITEMS = {
  REQUESTS: 'REQUESTS',
  ADD_OVERRIDE: 'ADD_OVERRIDE',
  SETTINGS: 'SETTINGS',
};

const Body = ({ menuItem, domain }) => {
  switch (menuItem) {
    case MENU_ITEMS.REQUESTS:
      return <RequestsList />;
    case MENU_ITEMS.ADD_OVERRIDE:
      return <StandaloneOverride domain={domain} />;
    default:
      return <span>Not implemented yet.</span>;
  }
};

export default ({ domain, hasRequests }) => {
  const [menuItem, setMenuItem] = useState(
    hasRequests ? MENU_ITEMS.REQUESTS : MENU_ITEMS.ADD_OVERRIDE,
  );

  return (
    <React.Fragment>
      <h2>{domain}</h2>
      <ul className="menu">
        {hasRequests && (
          <li className="menu__item">
            <button
              className={cn('menu__button', {
                menu_button_selected: menuItem === MENU_ITEMS.REQUESTS,
              })}
              onClick={() => setMenuItem(MENU_ITEMS.REQUESTS)}
            >
              Requests
            </button>
          </li>
        )}
        <li className="menu__item">
          <button
            className={cn('menu__button', {
              menu_button_selected: menuItem === MENU_ITEMS.ADD_OVERRIDE,
            })}
            onClick={() => setMenuItem(MENU_ITEMS.ADD_OVERRIDE)}
          >
            Add Override
          </button>
        </li>
        <li className="menu__item">
          <button
            className={cn('menu__button', {
              menu_button_selected: menuItem === MENU_ITEMS.SETTINGS,
            })}
            onClick={() => setMenuItem(MENU_ITEMS.SETTINGS)}
          >
            Settings
          </button>
        </li>
      </ul>
      <Body menuItem={menuItem} domain={domain} />
    </React.Fragment>
  );
};
