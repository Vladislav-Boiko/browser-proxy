import React from "react";
import Input from "../../atoms/Input/Input";
import { LABEL_TYPES } from "../../atoms/Label/Label";

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
      <Input
        className="queryParamterKey"
        label="Key"
        labelType={LABEL_TYPES.HIDDEN}
        value={keyName || ""}
        onChange={(value) => setKeyName(value)}
        placeholder="Key"
        disabled={isDisabled}
      />
      <Input
        className="queryParamterValue"
        label="Value"
        labelType={LABEL_TYPES.HIDDEN}
        value={value || ""}
        onChange={(value) => setValue(value)}
        placeholder="Value"
        disabled={isDisabled}
      />
      {remove && (
        <button className="queryParameter__delete" onClick={remove}>
          X
        </button>
      )}
    </React.Fragment>
  );
};

export default URLParameter;
