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

const MainSection = ({ selectedType, selectedNavigation, tabDomain }) => {
  switch (selectedType) {
    case NAV_TYPES.OVERRIDE:
      return <SelectedOverride />;
    case NAV_TYPES.DOMAIN:
      return (
        <Domain
          domain={selectedNavigation}
          hasRequests={tabDomain === selectedNavigation}
        />
      );
    default:
      // TODO: do we need this?
      return <span>Not implemented</span>;
  }
};

export default connect((state) => ({
  selectedType: getSelectedNavigationType(state),
  selectedNavigation: getSelectedNavigation(state),
  tabDomain: getCurrentDomain(state),
}))(MainSection);
