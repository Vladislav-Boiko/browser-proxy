import React from "react";

import "./UrlParameter.css";
const URLParameter = ({
  keyName,
  value,
  isDisabled,
  setKeyName,
  setValue,
  toggleDisabled,
  remove,
}) => {
  return (
    <React.Fragment>
      <label className="queryParamterCheckBox">
        <span className="queryParamterCheckBox__label">
          Is this query parameter enabled?
        </span>
        <input
          className="queryParamterCheckBox_input"
          type="checkbox"
          checked={!isDisabled}
          onChange={() => {
            toggleDisabled();
          }}
        />
      </label>
      <label className="queryParamterKey">
        <span className="queryParamterKey__label">Key</span>
        <input
          disabled={isDisabled}
          className="queryParamterKey__input"
          type="text"
          value={keyName || ""}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Key"
        />
      </label>
      <label className="queryParamterValue">
        <span className="queryParamterValue__label">Value</span>
        <input
          disabled={isDisabled}
          className="queryParamterValue__input"
          type="text"
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
        />
      </label>
      {remove && (
        <button className="queryParameter__delete" onClick={remove}>
          X
        </button>
      )}
    </React.Fragment>
  );
};

export default URLParameter;
