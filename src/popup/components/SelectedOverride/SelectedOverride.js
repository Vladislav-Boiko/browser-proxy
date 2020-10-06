import React, { useState } from "react";
import { connect } from "react-redux";
import { updateOverride, removeOverride } from "../../redux/overrides/actions";
import { removeItem } from "../../redux/folders/actions";
import { serialize } from "../../redux/storage/actions";
import {
  getSelectedOverride,
  getSelectedNavigation,
} from "../../redux/selectors";
import Url from "../Url/Url";
import ResponseOverride from "../ResposeOverride/ResponseOverride";
import { v4 as uuid } from "uuid";
import "./SelectedOverride.css";

export const SelectedOverride = ({ override, save, remove, navItem }) => {
  const [idValue, setId] = useState(override?.id || uuid());
  const [urlValue, setUrl] = useState(override.url);
  const [responseValue, setResponse] = useState(override.response);
  const [method, setMethod] = useState(override.method);
  console.log("The response value is", responseValue);
  // TODO: better implementation of initial values
  if (idValue !== navItem.id) {
    setId(navItem.id);
    setUrl(override.url);
    setResponse(override.response);
  }
  return (
    <form className="selected-override">
      <Url
        className="selected-override__url"
        url={override.url}
        onChange={({ method, url }) => {
          setUrl(url);
          setMethod(method);
        }}
      />
      <ResponseOverride
        className="selected-override__response"
        type={responseValue.type}
        code={responseValue.code}
        value={responseValue.value}
        onChange={setResponse}
      />
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
    save: (id, override) => {
      dispatch(updateOverride(id, override));
      dispatch(serialize());
    },
    remove: (navItem) => {
      dispatch(removeOverride(navItem.id));
      dispatch(removeItem(navItem));
      dispatch(serialize());
    },
  })
)(SelectedOverride);
