import React from "react";
import RequestHeader from "../RequestHeader/RequestHeader";
import RequestContent from "../RequestContent/RequestContent";
import Override from "../Override/Override";
import { connect } from "react-redux";
import {
  getAllRequests,
  getRequestsList,
  getOverridesOpen,
  getCurrentDomain,
} from "../../redux/selectors";
import {
  toggleRequest,
  saveOverride,
  closeOverride,
  openOverride,
} from "../../redux/actions";

import "./RequestsList.css";

export const RequestsList = ({
  requests,
  toggle,
  requestsList,
  overridesOpen,
  openOverride,
  closeOverride,
  saveOverride,
  domain,
}) => {
  if (!requests.length) {
    return (
      <h3 className="no-content">No requests were sent by this page yet.</h3>
    );
  }
  return (
    <React.Fragment>
      <h2 className="requests-header">Requests</h2>
      <ul className="requests-list">
        {requests.map(({ id, method, url, status, response }) => {
          const isRequestOpen = requestsList?.[id]?.isOpen;
          return (
            <li key={id}>
              <React.Fragment>
                <RequestHeader
                  url={url}
                  method={method}
                  status={status}
                  isOpen={isRequestOpen}
                  open={() => toggle(id)}
                />
                {isRequestOpen &&
                  (!overridesOpen[id] ? (
                    <RequestContent
                      response={response}
                      doOverride={() => openOverride(id)}
                    />
                  ) : (
                    <Override
                      url={url}
                      method={method}
                      response={response}
                      domain={domain}
                      cancel={() => closeOverride(id)}
                      save={(override) => saveOverride(id, override)}
                    />
                  ))}
              </React.Fragment>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default connect(
  (state) => ({
    requests: getAllRequests(state),
    requestsList: getRequestsList(state),
    overridesOpen: getOverridesOpen(state),
    domain: getCurrentDomain(state),
  }),
  (dispatch) => ({
    toggle: (id) => dispatch(toggleRequest(id)),
    saveOverride: (id, payload) => dispatch(saveOverride(id, payload)),
    openOverride: (id) => dispatch(openOverride(id)),
    closeOverride: (id) => dispatch(closeOverride(id)),
  })
)(RequestsList);
