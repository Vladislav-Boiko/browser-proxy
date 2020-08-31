import React from "react";
import "./Request.css";

const formatUrlPreview = (url) => {
  console.log("Got url:", url);
  const splitted = url.split("?");
  splitted.length > 1 && splitted.pop();
  console.log("returning: ", splitted.join(""));
  return splitted.join("");
};

const Request = ({ method, url, status }) => (
  <div className="request">
    <span>{method && method.toUpperCase()}</span>
    <span title={url} className="url">
      {formatUrlPreview(url)}
    </span>
    <span className="status">{status}</span>
  </div>
);

export default Request;
