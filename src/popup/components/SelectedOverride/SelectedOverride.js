import React, { useState } from "react";
import { connect } from "react-redux";
import { saveOverride, removeOverride } from "../../redux/actions";
import { getSelectedOverride } from "../../redux/selectors";
import { METHODS } from "../../utils/constants";

const SelectedOverride = ({ override, save, remove }) => {
  const [idValue, setId] = useState(override.id);
  const [urlValue, setUrl] = useState(override.url);
  const [responseValue, setResponse] = useState(override.response);
  const [method, setMethod] = useState(override.method);
  // TODO: better implementation of initial values
  if (idValue !== override.id) {
    setId(override.id);
    setUrl(override.url);
    setResponse(override.response);
  }
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
        className="delete-button"
        onClick={(e) => {
          e.preventDefault();
          remove(idValue);
        }}
      >
        Delete
      </button>
      <button
        className="save-button"
        onClick={(e) => {
          e.preventDefault();
          save(idValue, {
            url: urlValue,
            response: responseValue,
            method,
            domain: override.domain,
          });
        }}
      >
        Save
      </button>
    </form>
  );
};

export default connect(
  (state) => ({
    override: getSelectedOverride(state),
  }),
  (dispatch) => ({
    save: (id, override) => dispatch(saveOverride(id, override)),
    remove: (id) => dispatch(removeOverride(id)),
  })
)(SelectedOverride);
