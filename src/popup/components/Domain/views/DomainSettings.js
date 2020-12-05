import React, { useState } from 'react';
import cn from 'classnames';
import Button from '../../atoms/Button/Button';
import Icons from '../../atoms/Icons/Icons';
import Input from '../../atoms/Input/Input';

import '../Domain.css';
const DomainSettings = ({ setDomainName, domainName, className }) => {
  const [name, setName] = useState(domainName || '');
  return (
    <div className={cn('domain-settings', className)}>
      <h3 className="mt3">URL</h3>
      <Input
        label="Name"
        className="mt2"
        value={name}
        validationError={!name && 'Cannot be empty'}
        onChange={(newName) => {
          setName(newName);
          newName && setDomainName && setDomainName(newName);
        }}
      />
      <Input label="Active on" className="mt3" />
      <Button tretiary Icon={Icons.Add} className="mt2">
        Add active URL
      </Button>
      <h3 className="mt6">Import and Export</h3>
      <p>
        You can export all the underlying overrides into a file and import them
        for another domain or in another browser.
      </p>
      <div className="domain-settings__import-export mt4">
        <Button secondary className="mr3" Icon={Icons.Import}>
          Import
        </Button>
        <Button secondary Icon={Icons.Export}>
          Export
        </Button>
      </div>
      <h3 className="mt6">Turn OFF</h3>
      <p>
        Turning off will temporary disable theunderlying overrides. Removing
        will delete them completly.
      </p>
      <div className="domain-settings__turn-off mt4">
        <Button secondary className="mr3" Icon={Icons.TurnOff}>
          Turn OFF
        </Button>
        <Button secondary Icon={Icons.Trash}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default DomainSettings;
