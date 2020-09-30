import React from "react";
import SelectedOverride from "../SelectedOverride/SelectedOverride";
import Domain from "../Domain/Domain";
import { connect } from "react-redux";
import {
  getSelectedNavigationType,
  getSelectedNavigation,
  getCurrentDomain,
} from "../../redux/selectors";
import { NAV_TYPES } from "../Navigation/NavigationTypes";

const MainSection = ({ type, constentId, pageDomain }) => {
  switch (type) {
    case NAV_TYPES.OVERRIDE:
      return <SelectedOverride />;
    case NAV_TYPES.DOMAIN:
      return (
        <Domain domain={constentId} hasRequests={pageDomain === constentId} />
      );
    default:
      // TODO: do we need this?
      return <span>Not implemented</span>;
  }
};

export default connect((state) => ({
  type: getSelectedNavigationType(state),
  constentId: getSelectedNavigation(state)?.id,
  pageDomain: getCurrentDomain(state),
}))(MainSection);
