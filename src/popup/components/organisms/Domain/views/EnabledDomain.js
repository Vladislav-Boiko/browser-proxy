import React, { useState } from 'react';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Header from 'molecules/Header/Header';
import DomainRequests from './DomainRequests';
import DomainSettings from './DomainSettings.container';

import '../Domain.css';
const Domain = ({ className, addOverride, addFolder, ...props }) => {
  // TODO: if the domain is current domain, show the list of requests first.
  const [selectedMenuItem, setSelectedMenuItem] = useState('settings');
  return (
    <div className={className}>
      <Header
        options={[{ name: 'requests' }, { name: 'settings' }]}
        initiallySelected={selectedMenuItem}
        onChange={setSelectedMenuItem}
        onToggle={props.toggle}
        isOn={props.isOn}
      />
      <div className="ffr mt4 mx4">
        <Button
          primary
          className="mr3"
          Icon={Icons.AddFile}
          onClick={addOverride}
        >
          Add Override
        </Button>
        <Button secondary Icon={Icons.AddFolder} onClick={addFolder}>
          Add Folder
        </Button>
      </div>
      <div className="ffr mt3 mx4">
        {selectedMenuItem === 'requests' ? (
          <DomainRequests {...props} />
        ) : (
          <DomainSettings {...props} />
        )}
      </div>
    </div>
  );
};

export default Domain;
