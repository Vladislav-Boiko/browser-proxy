import React, { useState } from 'react';
import Header from 'molecules/Header/Header';
import Variables from 'organisms/Variables/Variables';
import FolderSettings from './Settings/FolderSettings';
import './Folder.css';

const FOLDER_MENU_OPTIONS = {
  SETTINGS: 'SETTINGS',
  VARIABLES: 'VARIABLES',
};

const Folder = ({ className, ...otherProps }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    FOLDER_MENU_OPTIONS.SETTINGS,
  );
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
        <FolderSettings {...otherProps} />
      )}
    </div>
  );
};

export default Folder;
