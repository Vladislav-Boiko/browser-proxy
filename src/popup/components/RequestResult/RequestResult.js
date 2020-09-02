import React from "react";
import ReactJson from "react-json-view";
import "./RequestResult.css";

const Response = ({ response }) => {
  if (!response) {
    return <span className="empty-response">Empty response</span>;
  }
  try {
    const asJson = JSON.parse(response);
    console.log(asJson);
    return (
      <ReactJson
        src={asJson}
        iconStyle="square"
        collapseStringsAfterLength="15"
        enableClipboard="true"
        collapsed="true"
      />
    );
  } catch (e) {
    return <span className="response-text">{response}</span>;
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
