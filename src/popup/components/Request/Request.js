import React from "react";
import { ReactComponent as Arrow } from "./arrow.svg";
import "./Request.css";

const formatUrlPreview = (url) => {
  console.log("Got url:", url);
  const splitted = url.split("?");
  splitted.length > 1 && splitted.pop();
  console.log("returning: ", splitted.join(""));
  return splitted.join("");
};

const Request = ({ method, url, status }) => (
  <button className="request">
    <span>{method && method.toUpperCase()}</span>
    <span title={url} className="url">
      {formatUrlPreview(url)}
    </span>
    <span className="status">{status}</span>
    <Arrow className="arrow" />
  </button>
);

export default Request;
