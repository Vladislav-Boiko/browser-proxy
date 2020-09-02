import React from "react";
import cn from "classnames";
import { ReactComponent as Arrow } from "./arrow.svg";
import "./Request.css";

const formatUrlPreview = (url) => {
  const splitted = url.split("?");
  splitted.length > 1 && splitted.pop();
  return splitted.join("");
};

const Request = ({ method, url, status, isOpen, open }) => (
  <button className={cn("request", { open: isOpen })} onClick={open}>
    <span>{method && method.toUpperCase()}</span>
    <span title={url} className="url">
      {formatUrlPreview(url)}
    </span>
    <span className="status">{status}</span>
    <Arrow className="arrow" />
  </button>
);

export default Request;
