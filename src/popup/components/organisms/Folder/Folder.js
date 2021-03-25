import React, { useState, useEffect } from 'react';
import Header from 'molecules/Header/Header';
import Variables from 'organisms/Variables/Variables';
import FolderSettings from './Settings/FolderSettings';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import './Folder.css';

const FOLDER_MENU_OPTIONS = {
  SETTINGS: 'SETTINGS',
  VARIABLES: 'VARIABLES',
};

const Folder = ({ className, ...otherProps }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    FOLDER_MENU_OPTIONS.SETTINGS,
  );
  const [variables, setVariables] = useState(otherProps.variables || []);
  useEffect(() => {
    setVariables(otherProps.variables || []);
  }, [otherProps.variables]);
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
        <React.Fragment>
          <Variables
            onVariablesChange={setVariables}
            initialVariables={variables}
          />
          <div className="mx4">
            <Button
              Icon={Icons.Enable}
              primary
              onClick={() => {
                otherProps.updateNode({ variables });
              }}
            >
              Save
            </Button>
          </div>
        </React.Fragment>
      )}
      {selectedMenuItem === FOLDER_MENU_OPTIONS.SETTINGS && (
        <FolderSettings {...otherProps} />
      )}
    </div>
  );
};

export default Folder;
