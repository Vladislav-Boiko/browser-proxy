import React, { useState } from "react";
import { connect } from "react-redux";
import { saveOverride } from "../../redux/overrides/actions";
import { v4 as uuid } from "uuid";
import { METHODS } from "../../utils/constants";

const StandaloneOverride = ({ domain, save }) => {
  const [urlValue, setUrl] = useState("");
  const [responseValue, setResponse] = useState("");
  const [method, setMethod] = useState("GET");
  return (
    <form className="override">
      <label>
        Method:
        <select
          name="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {METHODS.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </label>
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

export default connect(null, (dispatch) => ({
  save: (override) => dispatch(saveOverride(uuid(), override)),
}))(StandaloneOverride);
