import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Header from 'molecules/Header/Header';
import DomainRequests from './DomainRequests';
import DomainSettings from './DomainSettings.container';
import Variables from 'organisms/Variables/Variables';
import '../Domain.css';

const DOMAIN_MENU_OPTIONS = {
  REQUESTS: 'REQUESTS',
  SETTINGS: 'SETTINGS',
  VARIABLES: 'VARIABLES',
};

const getOptions = (isCurrent) => {
  if (isCurrent) {
    return [
      { name: DOMAIN_MENU_OPTIONS.REQUESTS },
      { name: DOMAIN_MENU_OPTIONS.SETTINGS },
      { name: DOMAIN_MENU_OPTIONS.VARIABLES },
    ];
  }
  return [
    { name: DOMAIN_MENU_OPTIONS.SETTINGS },
    { name: DOMAIN_MENU_OPTIONS.VARIABLES },
  ];
};

const Domain = ({ className, addOverride, addFolder, isCurrent, ...props }) => {
  // TODO: if the domain is current domain, show the list of requests first.
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    isCurrent ? DOMAIN_MENU_OPTIONS.REQUESTS : DOMAIN_MENU_OPTIONS.SETTINGS,
  );
  useEffect(() => {
    setSelectedMenuItem(
      isCurrent ? DOMAIN_MENU_OPTIONS.REQUESTS : DOMAIN_MENU_OPTIONS.SETTINGS,
    );
  }, [isCurrent]);
  return (
    <div className={cn('wmax', className)}>
      <Header
        options={getOptions(isCurrent)}
        initiallySelected={selectedMenuItem}
        onChange={setSelectedMenuItem}
        onToggle={props.toggle}
        isOn={props.isOn}
      />
      <div className="button-row mt4 mx4">
        <Button
          primary
          className="add-file"
          Icon={Icons.AddFile}
          onClick={addOverride}
        >
          Add Override
        </Button>
        <Button secondary Icon={Icons.AddFolder} onClick={addFolder}>
          Add Folder
        </Button>
      </div>
      {selectedMenuItem === DOMAIN_MENU_OPTIONS.REQUESTS && (
        <div className="ffr mt3 mx4">
          <DomainRequests {...props} addOverride={addOverride} />
        </div>
      )}
      {selectedMenuItem === DOMAIN_MENU_OPTIONS.SETTINGS && (
        <div className="ffr mt3 mx4">
          <DomainSettings {...props} />
        </div>
      )}
      {selectedMenuItem === DOMAIN_MENU_OPTIONS.VARIABLES && (
        <div className="mt2">
          <Variables {...props} />
        </div>
      )}
    </div>
  );
};

export default Domain;
