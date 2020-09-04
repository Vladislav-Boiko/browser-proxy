import React from "react";
import RequestHeader from "../RequestHeader/RequestHeader";
import RequestContent from "../RequestContent/RequestContent";
import { connect } from "react-redux";
import { getAllRequests, getRequestsList } from "../../redux/selectors";
import { toggleRequest } from "../../redux/actions";

import "./RequestsList.css";

export const RequestsList = ({ requests, toggle, requestsList }) => {
  if (!requests.length) {
    console.log(requests);
    return (
      <h3 className="no-content">No requests were sent by this page yet.</h3>
    );
  }
  return (
    <ul>
      {requests.map(({ id, method, url, status, response }) => {
        const isRequestOpen = requestsList?.[id]?.isOpen;
        return (
          <li key={id}>
            <RequestHeader
              url={url}
              method={method}
              status={status}
              isOpen={isRequestOpen}
              open={() => toggle(id)}
            />
            {isRequestOpen && <RequestContent response={response} />}
          </li>
        );
      })}
    </ul>
  );
};

export default connect(
  (state) => ({
    requests: getAllRequests(state),
    requestsList: getRequestsList(state),
  }),
  (dispatch) => ({
    toggle: (id) => dispatch(toggleRequest(id)),
  })
)(RequestsList);
