import React from "react";
import ReactJson from "react-json-view";
import "./RequestResult.css";

const Response = ({ response }) => {
  try {
    const asJson = JSON.parse(response);
    return <ReactJson src={asJson} />;
  } catch (e) {
    return <span className="response-text">{response}</span>;
  }
};

const RequestBody = ({ response }) => (
  <div className="request-body">
    <div className="request-content">
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
