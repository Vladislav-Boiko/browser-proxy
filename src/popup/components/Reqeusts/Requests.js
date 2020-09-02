import React from "react";
import Request from "../Request/Request";
import RequestResult from "../RequestResult/RequestResult";
import { connect } from "react-redux";
import { getAllRequests, getRequestsList } from "../../redux/selectors";
import { toggleRequest } from "../../redux/actions";

import "./Requests.css";

export const Requests = ({ requests, toggle, requestsList }) => (
  <ul>
    {requests.map(({ id, method, url, status, response }) => {
      const isRequestOpen = requestsList?.[id]?.isOpen;
      return (
        <li>
          <Request
            url={url}
            method={method}
            status={status}
            isOpen={isRequestOpen}
            open={() => toggle(id)}
          />
          {isRequestOpen && <RequestResult response={response} />}
        </li>
      );
    })}
  </ul>
);

export default connect(
  (state) => ({
    requests: getAllRequests(state),
    requestsList: getRequestsList(state),
  }),
  (dispatch) => ({
    toggle: (id) => dispatch(toggleRequest(id)),
  })
)(Requests);
