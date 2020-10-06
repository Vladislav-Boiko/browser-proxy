import React, { useState } from "react";
import { connect } from "react-redux";
import { addNewOverride } from "../../redux/actions";
import Url from "../Url/Url";
import ResponseOverride from "../ResposeOverride/ResponseOverride";

import "./StandaloneOverride.css";
export const StandaloneOverride = ({ domain, save }) => {
  const [urlValue, setUrl] = useState("");
  const [responseValue, setResponse] = useState({});
  const [method, setMethod] = useState("GET");
  return (
    <form className="standalone-override">
      <Url
        className="standalone-override__url"
        url={""}
        onChange={({ url, method }) => {
          setUrl(url);
          setMethod(method);
        }}
      />
      <ResponseOverride
        className="standalone-override__response"
        type="TEXT"
        onChange={setResponse}
      />
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
  save: (override) => addNewOverride(dispatch, override),
}))(StandaloneOverride);
