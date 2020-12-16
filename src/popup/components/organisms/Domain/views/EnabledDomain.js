import React, { useState } from 'react';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Header from 'molecules/Header/Header';
import DomainRequests from './DomainRequests';
import DomainSettings from './DomainSettings.container';

import '../Domain.css';
const Domain = ({ className, ...props }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('requests');
  return (
    <div className={className}>
      <Header
        options={[{ name: 'requests' }, { name: 'settings' }]}
        initiallySelected={selectedMenuItem}
        onChange={setSelectedMenuItem}
      />
      <div className="ffr mt4 mx4">
        <Button primary className="mr3" Icon={Icons.AddFile}>
          Add Override
        </Button>
        <Button secondary Icon={Icons.AddFolder}>
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
