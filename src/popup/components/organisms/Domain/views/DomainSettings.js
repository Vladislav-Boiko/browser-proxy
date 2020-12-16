import React, { useState, useEffect } from 'react';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';

import '../Domain.css';
const DomainSettings = ({ id, updateNode, name, className }) => {
  const [domainName, setName] = useState('');
  useEffect(() => {
    setName(name || '');
  });
  return (
    <div className={className}>
      <h3 className="mt3">URL</h3>
      <Input
        label="Name"
        className="mt2"
        value={domainName}
        validate={(value) => {
          return value === '' && 'Shall not be empty';
        }}
        onChange={(newName) => {
          setName(newName);
          updateNode && updateNode({ id, name: newName });
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
      <div className="wmax ffr mt4">
        <Button secondary className="mr3" Icon={Icons.Import}>
          Import
        </Button>
        <Button secondary Icon={Icons.Export}>
          Export
        </Button>
      </div>
      <h3 className="mt6">Turn OFF</h3>
      <p>
        Turning off will temporary disable the underlying overrides. Removing
        will delete them completely.
      </p>
      <div className="wmax ffr mt4">
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
