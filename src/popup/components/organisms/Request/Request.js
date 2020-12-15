import React, { useState } from 'react';
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
const Request = (props) => {
  const [selectedHeader, setSelectedHeader] = useState(MENU_OPTIONS.RESPONSE);
  return (
    <React.Fragment>
      <Header
        options={[
          { name: MENU_OPTIONS.RESPONSE },
          { name: MENU_OPTIONS.REQUEST },
        ]}
        initiallySelected={selectedHeader}
        onChange={setSelectedHeader}
      />
      {selectedHeader === MENU_OPTIONS.RESPONSE ? (
        <ResponseView />
      ) : (
        <RequestView />
      )}
      <div className="request__actions mt4 mx4">
        <Button Icon={Icons.Enable} primary className="mr3">
          Override
        </Button>
        <Button Icon={Icons.Trash} secondary>
          Remove
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Request;
