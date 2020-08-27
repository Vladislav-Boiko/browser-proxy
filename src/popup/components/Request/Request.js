import React from "react";

const Request = ({ method, url, status }) => (
  <div>
    <span>{method}</span>
    <span>{url}</span>
    <span>{status}</span>
  </div>
);

export default Request;
