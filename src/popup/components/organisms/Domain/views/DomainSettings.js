import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { evolve } from 'immutableql';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';

import '../Domain.css';
const DomainSettings = ({
  id,
  activeUrls,
  updateNode,
  name,
  className,
  removeDomain,
  ...otherProps
}) => {
  const [domainName, setName] = useState('');
  useEffect(() => {
    setName(name || '');
  });
  return (
    <div className={cn(className, 'wmax')}>
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
      {activeUrls?.map((url, index) => (
        <Input
          key={index}
          label={index === 0 ? 'Active on' : ''}
          value={url}
          className="mt3"
          onChange={(newValue) => {
            let updatedActiveUrls = activeUrls;
            if (newValue === '' && activeUrls.length > 1) {
              updatedActiveUrls = activeUrls.filter((e, i) => i !== index);
            } else {
              updatedActiveUrls = evolve(activeUrls, {
                [index]: newValue,
              });
            }
            updateNode && updateNode({ id, activeUrls: updatedActiveUrls });
          }}
        />
      ))}
      <Button
        tretiary
        Icon={Icons.Add}
        className="mt2"
        onClick={() =>
          updateNode &&
          updateNode({ id, activeUrls: [...(activeUrls || []), 'http://'] })
        }
      >
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
        <Button
          secondary
          className="mr3"
          Icon={Icons.TurnOff}
          onClick={otherProps.toggle}
        >
          {otherProps.isOn ? 'Turn OFF' : 'Turn On'}
        </Button>
        <Button secondary Icon={Icons.Trash} onClick={removeDomain}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default DomainSettings;
