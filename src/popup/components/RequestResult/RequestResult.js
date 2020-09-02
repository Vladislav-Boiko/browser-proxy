import React from "react";
import ReactJson from "react-json-view";
import "./RequestResult.css";

const Response = ({ response }) => {
  if (!response) {
    return <span className="empty-response">Empty response</span>;
  }
  try {
    const asJson = JSON.parse(response);
    return (
      <ReactJson
        src={asJson}
        iconStyle="square"
        collapseStringsAfterLength="15"
        collapsed={true}
        name={false}
      />
    );
  } catch (e) {
    // TODO: preview for array buffers and etc.
    return (
      <span className="response-text">
        {typeof response === "string"
          ? response
          : "Not supported response type"}
      </span>
    );
  }
};

const RequestBody = ({ response }) => (
  <div className="request-body">
    <div className="request-content">
      <h3>Response</h3>
      <div className="response">
        <Response response={response} />
      </div>
    </div>
    <div className="request-actions">
      <button className="override">Override</button>
    </div>
  </div>
);

export default RequestBody;
