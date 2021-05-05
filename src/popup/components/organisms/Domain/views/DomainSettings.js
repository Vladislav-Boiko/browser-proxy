import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { evolve } from 'immutableql';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import FileInput from 'atoms/FileInput/FileInput';

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
  const [error, setError] = useState('');
  useEffect(() => {
    setName(name || '');
  }, [setName, name]);
  const importToDomain = (importResult) => {
    try {
      let asJson = JSON.parse(importResult);
      if (!Array.isArray(asJson)) {
        asJson = [asJson];
      }
      importResult && otherProps.doImport && otherProps.doImport(asJson);
    } catch (e) {
      setError('File contents could not been parsed as json');
    }
  };
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
        className="mt2 animate_add"
        onClick={() =>
          updateNode &&
          updateNode({ id, activeUrls: [...(activeUrls || []), 'https://'] })
        }
      >
        Add active URL
      </Button>
      <h3 className="mt6">Import and Export</h3>
      <p>
        You can export all the underlying overrides into a file and import them
        for another domain, browser, or folder.
      </p>
      <div className="wmax button-row mt4">
        <FileInput
          secondary
          onSubmit={importToDomain}
          error={error}
          className="mr3"
        >
          Import
        </FileInput>
        <Button
          secondary
          Icon={Icons.Export}
          onClick={() => otherProps.doExport && otherProps.doExport()}
        >
          Export
        </Button>
      </div>
      <h3 className="mt6">Turn OFF</h3>
      <p>
        Disabling will temporary disable the underlying overrides. Removing will
        delete them completely.
      </p>
      <div className="wmax button-row my4">
        <Button secondary Icon={Icons.TurnOff} onClick={otherProps.toggle}>
          {otherProps.isOn ? 'Disable' : 'Enable'}
        </Button>
        <Button secondary Icon={Icons.Trash} onClick={removeDomain}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default DomainSettings;
