import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import Icons from '../../atoms/Icons/Icons';
import Header from '../../Header/Header';
import DomainRequests from './DomainRequests';
import DomainSettings from './DomainSettings';

import '../Domain.css';
const Domain = (props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('requests');
  return (
    <React.Fragment>
      <Header
        options={[{ name: 'requests' }, { name: 'settings' }]}
        initiallySelected={selectedMenuItem}
        onChange={setSelectedMenuItem}
      />
      <div className="domain-actions mt4 mx4">
        <Button primary className="mr3" Icon={Icons.AddFile}>
          Add Override
        </Button>
        <Button secondary Icon={Icons.AddFolder}>
          Add Folder
        </Button>
      </div>
      <div className="domain-actions mt3 mx4">
        {selectedMenuItem === 'requests' ? (
          <DomainRequests {...props} />
        ) : (
          <DomainSettings {...props} />
        )}
      </div>
    </React.Fragment>
  );
};

export default Domain;
