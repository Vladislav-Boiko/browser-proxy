import React, { useState } from "react";
import { METHODS } from "../../utils/constants";
import "./Url.css";

const urlToString = (url, urlParams) => {
  return urlParams.length
    ? `${url}` +
        urlParams
          .filter(
            ({ isDisabled }, index) =>
              !isDisabled && index !== urlParams.length - 1
          )
          .map(
            ({ key, value, delimeter }) =>
              `${key || ""}${delimeter}${value || ""}`
          )
          .join("&")
    : url;
};

const parseUrl = (url) => {
  let splitted = url.split("?");
  let urlValue = splitted.shift();
  if (splitted.length) {
    urlValue += "?";
  }
  const withoutBase = splitted.join("?");
  const urlParams = withoutBase
    ? withoutBase.split("&").map((pair) => {
        let splitted = pair.split("=");
        const key = splitted.shift();
        const delimeter = splitted.length ? "=" : "";
        const value = splitted.join("=");
        return { key, value, delimeter };
      })
    : [];
  return { urlValue, urlParams };
};

const updateUrlParams = (oldUrlParams, newUrlParams) => {
  let merged = [];
  for (let i = 0; i < Math.max(oldUrlParams.length, newUrlParams.length); ++i) {
    if (oldUrlParams[i] && oldUrlParams[i].isDisabled) {
      merged.push(oldUrlParams[i]);
    }
    if (newUrlParams[i]) {
      merged.push(newUrlParams[i]);
    }
  }
  return merged;
};

const addEmptyParams = (params) => [
  ...params,
  { key: "", value: "", delimeter: "" },
];

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

const Url = ({ url }) => {
  const [method, setMethod] = useState(METHODS[0]);
  const [urlValue, setUrl] = useState(url || "");
  const [urlParams, setUrlParams] = useState([
    { key: "", value: "", delimeter: "" },
  ]);
  return (
    <div className="url-container">
      <label className="method">
        <span className="method__label">Method</span>
        <select
          className="method__dropdown"
          name="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {METHODS.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </label>
      <label className="url">
        <span className="url__label">URL</span>
        <input
          className="url__input"
          type="text"
          value={urlToString(urlValue, urlParams)}
          onChange={(e) => {
            const value = e.target.value;
            const parsed = parseUrl(value);
            setUrl(parsed.urlValue);
            let updated = updateUrlParams(urlParams, parsed.urlParams);
            updated = addEmptyParams(updated);
            setUrlParams(updated);
          }}
        />
      </label>
      <fieldset className="queryParameters">
        <div className="queryParameters__grid">
          <legend className="queryParameters__legend">Query Params</legend>
          {urlParams.map(({ key, value, isDisabled }, index) => (
            <URLParameter
              key={`url-parameter-${index}`}
              keyName={key}
              value={value}
              isDisabled={isDisabled}
              setKeyName={(newName) => {
                let urlParamsCopy = [...urlParams];
                urlParamsCopy[index].key = newName;
                if (index === urlParams.length - 1) {
                  urlParamsCopy = addEmptyParams(urlParamsCopy);
                }
                if (urlParams.length === 1 && url[url.length - 1] !== "?") {
                  setUrl(`${url}?`);
                }
                setUrlParams(urlParamsCopy);
              }}
              setValue={(value) => {
                let urlParamsCopy = [...urlParams];
                if (!urlParamsCopy[index].value && !!value) {
                  urlParamsCopy[index].delimeter = "=";
                }
                if (!!urlParamsCopy[index].value && !value) {
                  urlParamsCopy[index].delimeter = "";
                }
                urlParamsCopy[index].value = value;
                if (index === urlParams.length - 1) {
                  urlParamsCopy = addEmptyParams(urlParamsCopy);
                }
                if (urlParams.length === 1 && url[url.length - 1] !== "?") {
                  setUrl(`${url}?`);
                }
                setUrlParams(urlParamsCopy);
              }}
              toggleDisabled={() => {
                let urlParamsCopy = [...urlParams];
                urlParamsCopy[index].isDisabled = !isDisabled;
                setUrlParams(urlParamsCopy);
              }}
              remove={
                index !== urlParams.length - 1 &&
                (() => {
                  let urlParamsCopy = [...urlParams];
                  urlParamsCopy.splice(index, 1);
                  setUrlParams(urlParamsCopy);
                })
              }
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Url;
