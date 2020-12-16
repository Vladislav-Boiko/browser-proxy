import React, { useState } from 'react';
import cn from 'classnames';
import Header from 'molecules/Header/Header';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import ResponseView from './views/Response';
import RequestView from './views/Request';

const MENU_OPTIONS = {
  RESPONSE: 'Response',
  REQUEST: 'REQUEST',
};

import './Request.css';
const Request = ({ className, ...otherProps }) => {
  const [selectedHeader, setSelectedHeader] = useState(MENU_OPTIONS.RESPONSE);
  return (
    <div className={className}>
      <Header
        options={[
          { name: MENU_OPTIONS.RESPONSE },
          { name: MENU_OPTIONS.REQUEST },
        ]}
        initiallySelected={selectedHeader}
        onChange={setSelectedHeader}
        onToggle={otherProps.toggle}
        isOn={otherProps.isOn}
      />
      <div
        className={cn('node-body', {
          'node-body_disabled': !otherProps.isOn,
        })}
      >
        {selectedHeader === MENU_OPTIONS.RESPONSE ? (
          <ResponseView {...otherProps} />
        ) : (
          <RequestView {...otherProps} />
        )}
        <div className="ffr mt4 mx4">
          <Button Icon={Icons.Enable} primary className="mr3">
            Override
          </Button>
          <Button Icon={Icons.Trash} secondary>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Request;
