import React, { useState } from 'react';
import Header from 'molecules/Header/Header';
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
    </React.Fragment>
  );
};

export default Request;
