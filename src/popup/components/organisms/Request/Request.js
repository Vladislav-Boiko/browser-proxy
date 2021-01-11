import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Header from 'molecules/Header/Header';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import ResponseView from './views/Response';
import RequestView from './views/Request';
import { renameKeys } from 'utils/utils';
import './Request.css';

const MENU_OPTIONS = {
  RESPONSE: 'RESPONSE',
  REQUEST: 'REQUEST',
};

const Request = ({ className, removeOverride, ...otherProps }) => {
  const [selectedHeader, setSelectedHeader] = useState(MENU_OPTIONS.RESPONSE);
  const [response, setResponse] = useState({});
  const [request, setRequest] = useState({});
  useEffect(() => {
    setResponse({});
    setRequest({});
  }, [otherProps.id]);
  const patchResponse = (patch) =>
    setResponse(Object.assign({}, response, patch));
  const patchRequest = (patch) => setRequest(Object.assign({}, request, patch));
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
          <ResponseView
            {...otherProps}
            onChange={(change) => {
              // Response view has other key names than the ones in redux.
              change = renameKeys(change, [
                { from: 'body', to: 'responseBody' },
                { from: 'code', to: 'responseCode' },
                { from: 'type', to: 'responseType' },
              ]);
              patchResponse(change);
            }}
            body={response.responseBody}
            initialBody={otherProps.responseBody}
            code={otherProps.responseCode}
            type={otherProps.responseType}
          />
        ) : (
          <RequestView
            {...otherProps}
            {...request}
            initialUrl={otherProps.url}
            initialMethod={otherProps.type}
            requestBodyType={otherProps.requestBodyType}
            requestBlobType={otherProps.requestBlobType}
            requestHeaders={otherProps.requestHeaders}
            onChange={(change) => {
              if (change && change.name) {
                otherProps.updateNode({ name: change.name });
              } else {
                change = renameKeys(change, [
                  { from: 'body', to: 'requestBody' },
                ]);
                patchRequest(change);
              }
            }}
            body={request.requestBody}
            initialBody={otherProps.requestBody}
          />
        )}
        <div className="ffr mt4 mx4">
          <Button
            Icon={Icons.Enable}
            primary
            className="mr3"
            onClick={() => {
              let updateEntry = Object.assign({}, response, request, {
                name: otherProps.name,
              });
              if (updateEntry.responseType !== 'BLOB' && otherProps.blobType) {
                updateEntry.blobType = '';
              }
              if (
                updateEntry.requestBodyType !== 'BLOB' &&
                otherProps.requestBlobType
              ) {
                updateEntry.requestBlobType = '';
              }
              otherProps.updateNode(updateEntry);
            }}
          >
            Save
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
