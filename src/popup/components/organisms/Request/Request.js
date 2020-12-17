import React, { useState } from 'react';
import cn from 'classnames';
import Header from 'molecules/Header/Header';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import ResponseView from './views/Response';
import RequestView from './views/Request';

const MENU_OPTIONS = {
  RESPONSE: 'RESPONSE',
  REQUEST: 'REQUEST',
};

import './Request.css';
const Request = ({ className, removeOverride, ...otherProps }) => {
  const [selectedHeader, setSelectedHeader] = useState(MENU_OPTIONS.RESPONSE);
  const [response, setResponse] = useState({});
  const updateResponse = (part) =>
    setResponse(Object.assign({}, response, part));
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
          <ResponseView {...otherProps} onChange={updateResponse} />
        ) : (
          <RequestView {...otherProps} />
        )}
        <div className="ffr mt4 mx4">
          <Button
            Icon={Icons.Enable}
            primary
            className="mr3"
            onClick={() => {
              otherProps.updateNode(response);
            }}
          >
            Override
          </Button>
          <Button Icon={Icons.Trash} secondary onClick={removeOverride}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Request;
