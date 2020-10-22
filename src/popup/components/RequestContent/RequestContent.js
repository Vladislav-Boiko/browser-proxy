import React from 'react';
import ResponseBody from '../ResponseBody/ResponseBody';
import Button from '../atoms/button/Button';
import './RequestContent.css';

const RequestContent = ({ response, doOverride }) => (
  <div className="request-body">
    <div className="request-content">
      <h3>Response</h3>
      <div className="request__response">
        <ResponseBody response={response} />
      </div>
    </div>
    <div className="request-actions">
      <Button className="override-button" onClick={doOverride}>
        Override
      </Button>
    </div>
  </div>
);

export default RequestContent;
