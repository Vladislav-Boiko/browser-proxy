import React, { useState } from "react";

import "./Override.css";
export default ({ url, method, response, cancel, save, domain }) => {
  const [urlValue, setUrl] = useState(url);
  const [responseValue, setResponse] = useState(response);
  return (
    <form className="override">
      <span className="method">{method}</span>
      <input
        type="text"
        value={urlValue}
        id="url"
        className="url-input"
        onChange={(e) => setUrl(e.target.value)}
      />
      <label htmlFor="response" className="response-label">
        Response
      </label>
      <textarea
        value={responseValue}
        className="response-input"
        onChange={(e) => setResponse(e.target.value)}
      ></textarea>
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
          save({ url: urlValue, response: responseValue, domain });
        }}
      >
        Save
      </button>
    </form>
  );
};
