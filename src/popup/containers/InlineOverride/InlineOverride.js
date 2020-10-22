import React, { useState } from 'react';
import Url from '../../components/Url/Url';
import ResponseOverride from '../../components/ResposeOverride/ResponseOverride';
import Override from '../../components/Overrride/Override';
import Button from '../../components/atoms/button/Button';

import './InlineOverride.css';
export default (props) => {
  const { id, url, response, cancel, save, domain } = props;
  const [idValue, setId] = useState(id);
  const [urlValue, setUrl] = useState(url);
  const [method, setMethod] = useState(props.method);
  const [responseValue, setResponse] = useState(response);
  // TODO: better implementation of initial values
  if (idValue !== id) {
    setId(id);
    setUrl(url);
    setResponse(response);
  }
  return (
    <React.Fragment>
      <Override save={save} override={(url, response, domain)} />
      <Button className="cancel-button" onClick={cancel}>
        Cancel
      </Button>
    </React.Fragment>
  );
};
