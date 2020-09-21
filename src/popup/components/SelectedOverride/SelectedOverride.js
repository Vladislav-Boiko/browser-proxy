import React from "react";
import InlineOverride from "../InlineOverride/InlineOverride";
import { connect } from "react-redux";
import { getSelectedOverride } from "../../redux/selectors";

const SelectedOverride = ({ override }) => {
  // TODO: actuall implementation
  return override ? <InlineOverride {...override} /> : "";
};

export default connect((state) => ({
  override: getSelectedOverride(state),
}))(SelectedOverride);
