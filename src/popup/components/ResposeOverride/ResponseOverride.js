import React, { useState } from "react";
import ResponseTypes from "./ResponseTypes/ResponseTypes";
import { RESPONSE_TYPES, HTTP_STATUS_CODES } from "../../utils/constants";
import Select from "../atoms/Select/Select";
import cn from "classnames";
import { LABEL_TYPES } from "../atoms/Label/Label";

import "./ResponseOverride.css";
const ResponseOverride = ({ value, type, code, onChange, className }) => {
  const [typeValue, setType] = useState(type || RESPONSE_TYPES.TEXT);
  const [responseValue, setResponseValue] = useState(value);
  const [responseCode, setReponseCode] = useState(code || 200);
  const notify = () =>
    onChange({ type: typeValue, response: responseValue, code: responseCode });
  return (
    <div className={cn("response-override", className)}>
      <h3>Response</h3>
      <Select
        className="response-override__type"
        options={Object.values(RESPONSE_TYPES).map((name) => ({
          name,
          value: name,
        }))}
        initial={type}
        label="Type"
        labelType={LABEL_TYPES.INLINE}
        onChange={(value) => {
          setType(value);
          notify();
        }}
      />
      <ResponseTypes
        type={typeValue}
        value={value}
        className="response-override__body"
        onChange={(value) => {
          setResponseValue(value);
          notify();
        }}
      />
      <Select
        className="response-override__code"
        options={Object.values(HTTP_STATUS_CODES).map(({ code, status }) => ({
          value: code,
          name: `${code} ${status}`,
        }))}
        initial={responseCode}
        label="Response code"
        labelType={LABEL_TYPES.INLINE}
        onChange={(value) => {
          setReponseCode(value);
          notify();
        }}
      />
    </div>
  );
};

export default ResponseOverride;
