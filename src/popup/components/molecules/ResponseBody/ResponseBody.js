import React, { useState } from 'react';
import Dropdown from 'atoms/Dropdown/Dropdown';
import ResponseType, { TYPES } from 'atoms/ResponseType/ResponseType';
import { HTTP_STATUS_CODES } from 'utils/constants';
import JsonBody from './JsonBody/JsonBody';
import BlobBody from './BlobBody/BlobBody';
import ArrayBufferBody from './ArrayBufferBody/ArrayBufferBody';
import TextBody from './TextBody/TextBody';

const RESPONSE_TYPES = [
  {
    name: 'JSON',
    value: 'JSON',
    view: <ResponseType type={TYPES.JSON} />,
  },
  {
    name: 'TEXT',
    value: 'TEXT',
    view: <ResponseType type={TYPES.TEXT} />,
  },
  {
    name: 'Blob',
    value: 'Blob',
    view: <ResponseType type={TYPES.BLOB} />,
  },
  {
    name: 'ArrayBuffer',
    value: 'ArrayBuffer',
    view: <ResponseType type={TYPES.ARRAY_BUFFER} />,
  },
  {
    name: 'Document',
    value: 'Document',
    view: <ResponseType type={TYPES.DOCUMENT} />,
  },
];

// TODO: add document as a response body type
const ResponseBodyBasedOnType = (type) => (props) => {
  switch (type) {
    case 'JSON':
      return <JsonBody {...props} />;
    case 'ArrayBuffer':
      return <ArrayBufferBody {...props} />;
    case 'Blob':
      return <BlobBody {...props} />;
    case 'Text':
      return <TextBody {...props} />;
    default:
      return <JsonBody {...props} />;
  }
};

import './ResponseBody.css';
const ResponseBody = ({ body, responseType, ...otherProps }) => {
  const [responseBodyType, setResponseBodyType] = useState(
    responseType || 'JSON',
  );
  const [responseBody, setResponseBody] = useState(body);
  const Body = ResponseBodyBasedOnType(responseBodyType);
  return (
    <React.Fragment>
      <div className="response-header">
        <Dropdown
          options={RESPONSE_TYPES}
          label="Type"
          initialState="JSON"
          onChange={setResponseBodyType}
        />
        <Dropdown
          label="Response code"
          initialState="200"
          options={HTTP_STATUS_CODES.map(({ code, status }) => ({
            name: `${code} ${status}`,
            value: `${code}`,
            view: code,
          }))}
        />
      </div>
      <Body body={body} className="mt3" />
    </React.Fragment>
  );
};

export default ResponseBody;
