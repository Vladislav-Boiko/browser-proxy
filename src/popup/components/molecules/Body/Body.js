import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Dropdown from 'atoms/Dropdown/Dropdown';
import ResponseType, { TYPES } from 'atoms/ResponseType/ResponseType';
import { HTTP_STATUS_CODES } from 'utils/constants';
import JsonBody from './JsonBody/JsonBody';
import BlobBody from './BlobBody/BlobBody';
import ArrayBufferBody from './ArrayBufferBody/ArrayBufferBody';
import TextBody from './TextBody/TextBody';
import './Body.css';

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
const BodyBasedOnType = ({ type, blobType, ...props }) => {
  switch (type) {
    case 'JSON':
      return <JsonBody {...props} />;
    case 'ArrayBuffer':
      return <ArrayBufferBody {...props} />;
    case 'BLOB':
      return <BlobBody blobType={blobType} {...props} />;
    case 'Text':
      return <TextBody {...props} />;
    default:
      return <JsonBody {...props} />;
  }
};

const Body = ({
  body,
  initialBody,
  type,
  code,
  className,
  onChange,
  blobType,
  hideCode,
}) => {
  code = '' + code;
  const [bodyType, setBodyType] = useState(type || 'JSON');
  const [codeChanged, setResponseCode] = useState(code || 200);
  useEffect(() => {
    setBodyType(type || 'JSON');
    setResponseCode(code || 200);
  }, [type, code]);
  return (
    <div className={cn(className)}>
      <div className="response-header ffr">
        <Dropdown
          options={RESPONSE_TYPES}
          label="Type"
          initialState={bodyType}
          onChange={(newType) => {
            setBodyType(newType);
            onChange && onChange({ type: newType });
          }}
          isUnsaved={type !== bodyType}
        />
        {!hideCode ? (
          <Dropdown
            label="Response code"
            initialState={code || '200'}
            options={HTTP_STATUS_CODES.map(({ code, status }) => ({
              name: `${code} ${status}`,
              value: `${code}`,
              view: code,
            }))}
            onChange={(newResponseCode) => {
              setResponseCode(newResponseCode);
              onChange && onChange({ code: newResponseCode });
            }}
            isUnsaved={code !== codeChanged}
          />
        ) : null}
      </div>
      <BodyBasedOnType
        blobType={blobType || ''}
        type={bodyType}
        initialBody={initialBody}
        body={body}
        className="mt3"
        onChange={(newResponseBody) => {
          if (bodyType === 'BLOB') {
            onChange && onChange(newResponseBody);
          } else {
            onChange && onChange({ body: newResponseBody });
          }
        }}
      />
    </div>
  );
};

export default Body;
