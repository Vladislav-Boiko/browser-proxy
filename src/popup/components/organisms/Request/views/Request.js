import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import Section from 'atoms/Section/Section';
import Url from 'molecules/Url/Url';
import HeadersList from 'molecules/HeadersList/HeadersList';
import Body from 'molecules/Body/Body';

const Request = (props) => {
  const [name, setName] = useState('');
  const [responseMethod, setResponseMethod] = useState();
  useEffect(() => {
    setName(props.name);
    setResponseMethod(props.type);
  }, [props.name, props.type]);
  const updateName = (newName) => {
    setName(newName);
    props.onChange && props.onChange({ name });
  };
  return (
    <div className="p4 wmax">
      <Input label="Name" value={name} onChange={updateName} />
      <Section
        className="mt5"
        header={<h3 className="py1">Request Url</h3>}
        isInitiallyOpen={true}
      >
        <Url
          className="my3"
          method={responseMethod}
          onMethodChange={setResponseMethod}
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
