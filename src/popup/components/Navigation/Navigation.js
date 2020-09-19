import React from "react";
import TreeItem from "../TreeItem/TreeItem";
import { connect } from "react-redux";
import {
  getOverridesList,
  getCurrentDomain,
  getSelectedNavigation,
} from "../../redux/selectors";
import { selectNavigation } from "../../redux/actions";
import { NAV_TYPES } from "./NavigationTypes";

const mapOverridesToNavigation = (allOVerrides) =>
  allOVerrides.map(({ domain, overrides }) => ({
    name: domain,
    id: domain,
    isIniitiallyOpen: false,
    type: NAV_TYPES.DOMAIN,
    subNodes: overrides.map(({ url, id }) => ({
      name: url,
      id,
      isIniitiallyOpen: false,
      type: NAV_TYPES.OVERRIDE,
    })),
  }));

const addAndSelectCurrent = (navigation, currentDomain) => {
  const index = navigation.findIndex(({ name }) => name === currentDomain);
  if (index >= 0) {
    navigation[index].isSelected = true;
  } else {
    navigation.unshift({
      id: currentDomain,
      name: currentDomain,
      isSelected: true,
      isIniitiallyOpen: true,
      type: NAV_TYPES.DOMAIN,
    });
  }
  // putting current domain on top
  return navigation.sort(({ name }) => (name === currentDomain ? -1 : 1));
};

const Navigation = ({ className, overrides, domain, select, selected }) => {
  const mappedOverrides = mapOverridesToNavigation(overrides);
  const navigation = addAndSelectCurrent(mappedOverrides, domain);
  return (
    <nav className={className}>
      {navigation.map((navItem) => (
        <TreeItem {...navItem} select={select} selected={selected} />
      ))}
    </nav>
  );
};

export default connect(
  (state) => ({
    overrides: getOverridesList(state),
    domain: getCurrentDomain(state),
    selected: getSelectedNavigation(state),
  }),
  (dispatch) => ({
    select: (id, type) => dispatch(selectNavigation(id, type)),
  })
)(Navigation);
