import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import Header from 'molecules/Header/Header';
import Variables from 'organisms/Variables/Variables';
import './Folder.css';

const FOLDER_MENU_OPTIONS = {
  SETTINGS: 'SETTINGS',
  VARIABLES: 'VARIABLES',
};

const Folder = ({
  name,
  className,
  addOverride,
  removeFolder,
  update,
  ...otherProps
}) => {
  const [folderName, setName] = useState(name || '');
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    FOLDER_MENU_OPTIONS.SETTINGS,
  );
  useEffect(() => {
    setName(name || '');
  }, [name]);
  return (
    <div className={className}>
      <Header
        options={[
          { name: FOLDER_MENU_OPTIONS.SETTINGS },
          { name: FOLDER_MENU_OPTIONS.VARIABLES },
        ]}
        initiallySelected={selectedMenuItem}
        onToggle={otherProps.toggle}
        onChange={setSelectedMenuItem}
        isOn={otherProps.isOn}
      />
      {selectedMenuItem === FOLDER_MENU_OPTIONS.VARIABLES && (
        <Variables {...otherProps} />
      )}
      {selectedMenuItem === FOLDER_MENU_OPTIONS.SETTINGS && (
        <div
          className={cn('mx4 node-body', {
            'node-body_disabled': !otherProps.isOn,
          })}
        >
          <Button
            primary
            className="mt4 add-file"
            Icon={Icons.AddFile}
            onClick={addOverride}
          >
            Add Override
          </Button>
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
            <Button secondary Icon={Icons.Import}>
              Import
            </Button>
            <Button secondary Icon={Icons.Export}>
              Export
            </Button>
          </div>
          <h3 className="mt6">Turn OFF</h3>
          <p className="wmax">
            Turning off will temporary disable the underlying overrides.
            Removing will delete them completely.
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
      )}
    </div>
  );
};

export default Folder;
