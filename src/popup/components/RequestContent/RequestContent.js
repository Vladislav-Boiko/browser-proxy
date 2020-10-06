import React from "react";
import ResponseBody from "../ResponseBody/ResponseBody";
import "./RequestContent.css";

const RequestContent = ({ response, doOverride }) => (
  <div className="request-body">
    <div className="request-content">
      <h3>Response</h3>
      <div className="request__response">
        <ResponseBody response={response} />
      </div>
    </div>
    <div className="request-actions">
      <button
        className="override-button"
        onClick={(e) => {
          e.preventDefault();
          doOverride();
        }}
      >
        Override
      </button>
    </div>
  </div>
);

export default RequestContent;
