import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import Section from 'atoms/Section/Section';
import Url from 'molecules/Url/Url';
import HeadersList from 'molecules/HeadersList/HeadersList';
import Body from 'molecules/Body/Body';
import { renameKeys } from 'utils/utils';

const Request = (props) => {
  const [name, setName] = useState('');
  useEffect(() => {
    setName(props.name);
  }, [props.name]);
  const updateName = (newName) => {
    setName(newName);
    props.onChange && props.onChange({ name: newName });
  };
  return (
    <div className="p4 pt3 wmax">
      <Input
        label="Name"
        value={name}
        onChange={updateName}
        validate={(value) => value === '' && 'Cannot be empty'}
      />
      <Section
        className="mt5"
        header={<h3 className="py1">Request URL</h3>}
        isInitiallyOpen={true}
      >
        <Url
          className="mt2"
          initialMethod={props.initialMethod}
          initialUrl={props.initialUrl}
          method={props.type}
          url={props.url || ''}
          onChange={(change) => {
            change = renameKeys(change, [{ from: 'method', to: 'type' }]);
            props.onChange && props.onChange(change);
          }}
        />
      </Section>
      <Section className="mt5" header={<h3 className="py1">Request Body</h3>}>
        <Body
          className="my3"
          body={props.body}
          initialBody={props.initialBody}
          type={props.requestBodyType}
          blobType={props.requestBlobType}
          onChange={(change) => {
            change = renameKeys(change, [
              { from: 'type', to: 'requestBodyType' },
              { from: 'blobType', to: 'requestBlobType' },
            ]);
            props.onChange && props.onChange(change);
          }}
          hideCode
        />
      </Section>
      <Section
        className="mt5"
        header={<h3 className="py1">Request Headers</h3>}
      >
        <HeadersList
          className="my3"
          headers={props.requestHeaders}
          onChange={(requestHeaders) => props.onChange({ requestHeaders })}
        />
      </Section>
    </div>
  );
};

export default Request;
