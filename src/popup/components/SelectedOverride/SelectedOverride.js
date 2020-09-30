import React, { useState } from "react";
import { connect } from "react-redux";
import { updateOverride, removeOverride } from "../../redux/overrides/actions";
import { removeItem } from "../../redux/folders/actions";
import { serialize } from "../../redux/storage/actions";
import {
  getSelectedOverride,
  getSelectedNavigation,
} from "../../redux/selectors";
import { METHODS } from "../../utils/constants";

const SelectedOverride = ({ override, save, remove, navItem }) => {
  const [idValue, setId] = useState(override.id);
  const [urlValue, setUrl] = useState(override.url);
  const [responseValue, setResponse] = useState(override.response);
  const [method, setMethod] = useState(override.method);
  // TODO: better implementation of initial values
  if (idValue !== navItem.id) {
    setId(navItem.id);
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
          remove(navItem);
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
    navItem: getSelectedNavigation(state),
  }),
  (dispatch) => ({
    save: (id, override) => dispatch(updateOverride(id, override)),
    remove: (navItem) => {
      dispatch(removeOverride(navItem.id));
      dispatch(removeItem(navItem));
      dispatch(serialize());
    },
  })
)(SelectedOverride);
