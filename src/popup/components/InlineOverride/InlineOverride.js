import React, { useState } from "react";
import Url from "../Url/Url";
import ResponseOverride from "../ResposeOverride/ResponseOverride";

import "./InlineOverride.css";
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
    <form className="inline-override">
      <Url
        className="inline-override__url"
        url={url}
        onChange={(payload) => {
          setUrl(payload.url);
          setMethod(payload.method);
        }}
      />
      <ResponseOverride
        className="inline-override__response"
        type={responseValue.type}
        code={responseValue.code}
        value={responseValue.value}
        onChange={setResponse}
      />
      <button
        className="cancel-button"
        onClick={(e) => {
          e.preventDefault();
          cancel();
        }}
      >
        Cancel
      </button>
      <button
        className="save-button"
        onClick={(e) => {
          e.preventDefault();
          save({ url: urlValue, response: responseValue, method, domain });
        }}
      >
        Save
      </button>
    </form>
  );
};
