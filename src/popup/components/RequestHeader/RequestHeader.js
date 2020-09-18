import React from "react";
import cn from "classnames";
import { ReactComponent as Arrow } from "./arrow.svg";
import "./RequestHeader.css";

const formatUrlPreview = (url) => {
  const splitted = url.split("?");
  splitted.length > 1 && splitted.pop();
  return splitted.join("");
};

const RequestHeader = ({ method, url, status, isOpen, open }) => (
  <button
    className={cn("request-header", { "request-header_open": isOpen })}
    onClick={open}
  >
    <span className="request-header__method">
      {method && method.toUpperCase()}
    </span>
    <span title={url} className="request-header__url">
      {formatUrlPreview(url)}
    </span>
    <span className="request-header__status">{status}</span>
    <Arrow
      className={cn("request-header__arrow", {
        "request-header__arrow_open": isOpen,
      })}
    />
  </button>
);

export default RequestHeader;
