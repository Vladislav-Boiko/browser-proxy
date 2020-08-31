import React from "react";
import Request from "../Request/Request";
import { connect } from "react-redux";
import { getAllRequests } from "../../redux/selectors";

import "./Requests.css";
export const Requests = ({ requests }) => (
  <ul>
    {requests.map(({ method, url, status }) => (
      <li>
        <Request url={url} method={method} status={status} />
      </li>
    ))}
  </ul>
);

export default connect((state) => ({
  requests: getAllRequests(state),
}))(Requests);
