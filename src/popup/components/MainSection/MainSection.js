import React from "react";
import RequestsList from "../ReqeustsList/RequestsList";
import SelectedOverride from "../SelectedOverride/SelectedOverride";
import { connect } from "react-redux";
import { getSelectedNavigationType } from "../../redux/selectors";
import { NAV_TYPES } from "../Navigation/NavigationTypes";

const MainSection = ({ selectedType }) => {
  if (selectedType === NAV_TYPES.OVERRIDE) {
    return <SelectedOverride />;
  }
  return <RequestsList />;
};

export default connect((state) => ({
  selectedType: getSelectedNavigationType(state),
}))(MainSection);
