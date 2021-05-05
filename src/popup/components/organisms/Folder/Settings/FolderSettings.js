import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import FileInput from 'atoms/FileInput/FileInput';

import './FolderSettings.css';
const Folder = ({
  name,
  className,
  addOverride,
  removeFolder,
  addFolder,
  update,
  ...otherProps
}) => {
  const [folderName, setName] = useState(name || '');
  useEffect(() => {
    setName(name || '');
  }, [name]);
  const [error, setError] = useState('');
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
    <div className={className}>
      <div
        className={cn('mx4 node-body', {
          'node-body_disabled': !otherProps.isOn,
        })}
      >
        <div className="button-row mt4">
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
        <Input
          label="Name"
          className="mt4 wmax"
          value={folderName}
          validate={(value) => value === '' && 'Cannot be empty'}
          onChange={(newName) => {
            setName(newName);
            newName && update && update({ name: newName });
          }}
        />
        <h3 className="mt6">Import and Export</h3>
        <p className="wmax">
          You can export all the underlying overrides into a file and import
          them for another domain, browser, or folder.
        </p>
        <div className="button-row mt4">
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
        <p className="wmax">
          Turning off will temporary disable the underlying overrides. Removing
          will delete them completely.
        </p>
        <div className="button-row mt4">
          <Button secondary Icon={Icons.TurnOff} onClick={otherProps.toggle}>
            {otherProps.isOn ? 'Turn OFF' : 'Turn On'}
          </Button>
          <Button secondary Icon={Icons.Trash} onClick={removeFolder}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Folder;
