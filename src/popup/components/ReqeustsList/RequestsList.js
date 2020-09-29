import React from "react";
import RequestHeader from "../RequestHeader/RequestHeader";
import RequestContent from "../RequestContent/RequestContent";
import InlineOverride from "../InlineOverride/InlineOverride";
import { connect } from "react-redux";
import {
  getAllRequests,
  getOpenClosedRequests,
  getInlineOverrides,
  getCurrentDomain,
} from "../../redux/selectors";
import { addOverride } from "../../redux/overrides/actions";
import {
  closeOverride,
  openOverride,
} from "../../redux/inlineOverrides/actions";
import { toggleRequest } from "../../redux/requests/actions";

import "./RequestsList.css";

export const RequestsList = ({
  requests,
  toggle,
  openClosedRequests,
  inlineOverrides,
  openOverride,
  closeOverride,
  addOverride,
  domain,
}) => {
  if (!requests.length) {
    return (
      <h3 className="no-content">No requests were sent by this page yet.</h3>
    );
  }
  console.log("Inline overrides are:", inlineOverrides);
  return (
    <React.Fragment>
      <h2 className="requests-header">Requests</h2>
      <ul className="requests-list">
        {requests.map(({ id, method, url, status, response }) => {
          const isRequestOpen = openClosedRequests?.[id]?.isOpen;
          return (
            <li key={id} className="requests-list__row">
              <React.Fragment>
                <RequestHeader
                  url={url}
                  method={method}
                  status={status}
                  isOpen={isRequestOpen}
                  open={() => toggle(id)}
                />
                {isRequestOpen &&
                  (!inlineOverrides[id] ? (
                    <RequestContent
                      response={response}
                      doOverride={() => openOverride(id)}
                    />
                  ) : (
                    <InlineOverride
                      url={url}
                      method={method}
                      response={response}
                      domain={domain}
                      cancel={() => closeOverride(id)}
                      save={(override) => addOverride(id, override)}
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
    openClosedRequests: getOpenClosedRequests(state),
    inlineOverrides: getInlineOverrides(state),
    domain: getCurrentDomain(state),
  }),
  (dispatch) => ({
    toggle: (id) => dispatch(toggleRequest(id)),
    addOverride: (id, payload) => dispatch(addOverride(id, payload)),
    openOverride: (id) => dispatch(openOverride(id)),
    closeOverride: (id) => dispatch(closeOverride(id)),
  })
)(RequestsList);
