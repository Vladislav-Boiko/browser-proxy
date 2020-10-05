import React, { useState } from "react";
import URLParameter from "./UrlParameter/UrlParameter";
import { METHODS } from "../../utils/constants";
import "./Url.css";

class Url extends React.Component {
  state = {
    method: METHODS[0],
    urlValue: "",
    urlParams: [{ key: "", value: "", delimeter: "" }],
  };

  addEmptyParams(params) {
    return [...params, { key: "", value: "", delimeter: "" }];
  }

  updateUrlParams(oldUrlParams, newUrlParams) {
    let merged = [];
    for (
      let i = 0;
      i < Math.max(oldUrlParams.length, newUrlParams.length);
      ++i
    ) {
      if (oldUrlParams[i] && oldUrlParams[i].isDisabled) {
        merged.push(oldUrlParams[i]);
      }
      if (newUrlParams[i]) {
        merged.push(newUrlParams[i]);
      }
    }
    return merged;
  }

  parseUrl(url) {
    let splitted = url.split("?");
    let urlValue = splitted.shift();
    let urlParams = [];
    if (splitted.length) {
      urlValue += "?";
      const withoutBase = splitted.join("?");
      urlParams = withoutBase
        ? withoutBase.split("&").map((pair) => {
            let splitted = pair.split("=");
            const key = splitted.shift();
            const delimeter = splitted.length ? "=" : "";
            const value = splitted.join("=");
            return { key, value, delimeter };
          })
        : [];
    }
    return { urlValue, urlParams };
  }

  getUrlString() {
    const { urlValue, urlParams } = this.state;
    return urlParams.length > 1
      ? `${urlValue}` +
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
      : urlValue;
  }

  setMethod(method) {
    this.setState({ method });
  }

  setUrl(urlValue) {
    this.setState({ urlValue });
  }

  setUrlParams(urlParams) {
    const { urlValue } = this.state;
    if (
      urlParams.filter(({ isDisabled }) => !isDisabled).length > 1 &&
      urlValue[urlValue.length - 1] !== "?"
    ) {
      this.setUrl(`${urlValue}?`);
    }
    this.setState({ urlParams });
  }

  onUrlValueChange(value) {
    const { urlParams } = this.state;
    const parsed = this.parseUrl(value);
    this.setUrl(parsed.urlValue);
    let updated = this.updateUrlParams(urlParams, parsed.urlParams);
    updated = this.addEmptyParams(updated);
    this.setUrlParams(updated);
  }

  onQueryKeyChange(newName, index) {
    const { urlParams } = this.state;
    let urlParamsCopy = [...urlParams];
    urlParamsCopy[index].key = newName;
    if (index === urlParams.length - 1) {
      urlParamsCopy = this.addEmptyParams(urlParamsCopy);
    }
    this.setUrlParams(urlParamsCopy);
  }

  onQueryValueChange(value, index) {
    const { urlParams } = this.state;
    let urlParamsCopy = [...urlParams];
    if (!urlParamsCopy[index].value && !!value) {
      urlParamsCopy[index].delimeter = "=";
    }
    if (!!urlParamsCopy[index].value && !value) {
      urlParamsCopy[index].delimeter = "";
    }
    urlParamsCopy[index].value = value;
    if (index === urlParams.length - 1) {
      urlParamsCopy = this.addEmptyParams(urlParamsCopy);
    }
    this.setUrlParams(urlParamsCopy);
  }

  onQueryToggleDisabled(index) {
    let urlParamsCopy = [...this.state.urlParams];
    urlParamsCopy[index].isDisabled = !urlParamsCopy[index].isDisabled;
    this.setUrlParams(urlParamsCopy);
  }

  onQueryRemove(index) {
    let urlParamsCopy = [...this.state.urlParams];
    urlParamsCopy.splice(index, 1);
    this.setUrlParams(urlParamsCopy);
  }

  componentDidMount() {
    this.onUrlValueChange(this.props.url);
  }

  // TODO: think of getDerivedStateFromProps
  componentWillReceiveProps(newProps) {
    if (newProps.url !== this.props.url) {
      this.onUrlValueChange(newProps.url);
    }
  }

  render() {
    const { method, urlParams } = this.state;
    return (
      <div className="url-container">
        <label className="method">
          <span className="method__label">Method</span>
          <select
            className="method__dropdown"
            name="method"
            value={method}
            onChange={(e) => this.setMethod(e.target.value)}
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
            value={this.getUrlString()}
            onChange={(e) => {
              this.onUrlValueChange(e.target.value);
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
                setKeyName={(newKeyName) =>
                  this.onQueryKeyChange(newKeyName, index)
                }
                setValue={(newValue) =>
                  this.onQueryValueChange(newValue, index)
                }
                toggleDisabled={() => this.onQueryToggleDisabled(index)}
                remove={
                  index !== urlParams.length - 1 &&
                  (() => this.onQueryRemove(index))
                }
              />
            ))}
          </div>
        </fieldset>
      </div>
    );
  }
}

export default Url;