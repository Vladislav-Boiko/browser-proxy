import React, { useState, useEffect } from 'react';
import cn from 'classnames';
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
    name: 'BLOB',
    value: 'BLOB',
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
const BodyBasedOnType = ({ type, ...props }) => {
  switch (type) {
    case 'JSON':
      return <JsonBody {...props} />;
    case 'ArrayBuffer':
      return <ArrayBufferBody {...props} />;
    case 'BLOB':
      return <BlobBody {...props} />;
    case 'Text':
      return <TextBody {...props} />;
    default:
      return <JsonBody {...props} />;
  }
};

import './Body.css';
const Body = ({ body, responseType, responseCode, className, onChange }) => {
  const [responseBodyType, setBodyType] = useState('JSON');
  useEffect(() => {
    setBodyType(responseType || 'JSON');
  }, [responseType]);
  return (
    <div className={cn(className)}>
      <div className="response-header ffr">
        <Dropdown
          options={RESPONSE_TYPES}
          label="Type"
          initialState={responseBodyType}
          onChange={(newType) => {
            setBodyType(newType);
            onChange && onChange({ responseType: newType });
          }}
        />
        <Dropdown
          label="Response code"
          initialState={responseCode || '200'}
          options={HTTP_STATUS_CODES.map(({ code, status }) => ({
            name: `${code} ${status}`,
            value: `${code}`,
            view: code,
          }))}
          onChange={(newResponseCode) => {
            onChange && onChange({ responseCode: newResponseCode });
          }}
        />
      </div>
      <BodyBasedOnType
        type={responseBodyType}
        body={body}
        className="mt3"
        onChange={(newResponseBody) => {
          onChange && onChange({ body: newResponseBody });
        }}
      />
    </div>
  );
};

export default Body;
