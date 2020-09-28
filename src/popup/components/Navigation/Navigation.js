import React from "react";
import TreeItem from "../TreeItem/TreeItem";
import { connect } from "react-redux";
import {
  getDomainsList,
  getCurrentDomain,
  getSelectedNavigation,
} from "../../redux/selectors";
import { selectNavigation } from "../../redux/actions";
import { NAV_TYPES } from "./NavigationTypes";

const mapDomainsToNavigation = (domains) =>
  domains.map(({ domain, overrides }) => ({
    name: domain,
    id: domain,
    isIniitiallyOpen: false,
    type: NAV_TYPES.DOMAIN,
    subNodes: overrides
      .filter((notNull) => !!notNull)
      .map(({ url, id }) => ({
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

const Navigation = ({ className, domains, domain, select, selected }) => {
  const mappedOverrides = mapDomainsToNavigation(domains);
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
    domains: getDomainsList(state),
    domain: getCurrentDomain(state),
    selected: getSelectedNavigation(state),
  }),
  (dispatch) => ({
    select: (payload) => dispatch(selectNavigation(payload)),
  })
)(Navigation);
