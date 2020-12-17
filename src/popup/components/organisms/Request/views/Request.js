import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import Section from 'atoms/Section/Section';
import Url from 'molecules/Url/Url';
import HeadersList from 'molecules/HeadersList/HeadersList';
import Body from 'molecules/Body/Body';

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
    <div className="p4 wmax">
      <Input
        label="Name"
        value={name}
        onChange={updateName}
        validate={(value) => value === '' && 'Cannot be empty'}
      />
      <Section
        className="mt5"
        header={<h3 className="py1">Request Url</h3>}
        isInitiallyOpen={true}
      >
        <Url
          className="my3"
          initialMethod={props.initialMethod}
          initialUrl={props.initialUrl}
          method={props.type}
          url={props.url || ''}
          onChange={(change) => {
            for (let mappedKey of [{ from: 'method', to: 'type' }]) {
              if (change[mappedKey.from]) {
                const value = change[mappedKey.from];
                delete change[mappedKey.from];
                change[mappedKey.to] = value;
              }
            }
            props.onChange && props.onChange(change);
          }}
        />
      </Section>
      <Section className="mt5" header={<h3 className="py1">Request Body</h3>}>
        <Body className="my3" />
      </Section>
      <Section
        className="mt5"
        header={<h3 className="py1">Request Headers</h3>}
      >
        <HeadersList className="my3" />
      </Section>
    </div>
  );
};

export default Request;
