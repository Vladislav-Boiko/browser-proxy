import React, { useState } from 'react';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import cn from 'classnames';
import Header from 'molecules/Header/Header';

import './Folder.css';
const Folder = ({ folderName }) => {
  const [name, setName] = useState(folderName || '');
  return (
    <React.Fragment>
      <Header options={[{ name: 'settings' }]} initiallySelected={'settings'} />
      <div className="mx4">
        <Button primary className="mt4" Icon={Icons.AddFile}>
          Add Override
        </Button>
        <Input
          label="Name"
          className="mt4"
          value={name}
          validate={(value) => value === '' && 'Cannot be empty'}
          onChange={(newName) => {
            setName(newName);
            newName && setDomainName && setDomainName(newName);
          }}
        />
        <h3 className="mt6">Import and Export</h3>
        <p>
          You can export all the underlying overrides into a file and import
          them for another domain, brother, or folder.
        </p>
        <div className="ffr mt4">
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
        <div className="ffr mt4">
          <Button secondary className="mr3" Icon={Icons.TurnOff}>
            Turn OFF
          </Button>
          <Button secondary Icon={Icons.Trash}>
            Remove
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Folder;
