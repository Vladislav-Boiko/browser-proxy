import React, { useState } from 'react';
import Url from '../Url/Url';
import Button from '../atoms/Button/Button';
import ResponseOverride from '../ResposeOverride/ResponseOverride';

import './Override.css';
export const Override = ({ override = {}, save }) => {
  const [urlValue, setUrl] = useState(override.url || '');
  const [responseValue, setResponse] = useState({});
  const [method, setMethod] = useState(override.method || 'GET');
  return (
    <form className="standalone-override">
      <Url
        className="standalone-override__url"
        url={urlValue}
        method={method}
        onChange={({ url, method }) => {
          setUrl(url);
          setMethod(method);
        }}
      />
      <ResponseOverride
        value={override.response?.value}
        type={override.response?.type}
        code={override.response?.code}
        className="standalone-override__response"
        onChange={setResponse}
      />
      <Button
        onClick={() =>
          save(
            Object.assign(override, {
              url: urlValue,
              response: responseValue,
              method,
            }),
          )
        }
      >
        Save
      </Button>
    </form>
  );
};

export default Override;
