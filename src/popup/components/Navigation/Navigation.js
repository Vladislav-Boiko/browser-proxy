import React from "react";
import TreeItem from "../TreeItem/TreeItem";
import { connect } from "react-redux";
import {
  getFolders,
  getCurrentDomain,
  getSelectedNavigation,
} from "../../redux/selectors";
import { selectItem } from "../../redux/navigation/actions";
import { NAV_TYPES } from "./NavigationTypes";

const mapFoldersToNavigation = (folders) => folders.root;

const addAndSelectCurrent = (navigation, currentDomain) => {
  const index = navigation.findIndex(({ id }) => id === currentDomain);
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

const Navigation = ({ className, folders, domain, select, selected }) => {
  const mappedNavigation = mapFoldersToNavigation(folders);
  const navigation = addAndSelectCurrent(mappedNavigation, domain);
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
    folders: getFolders(state),
    domain: getCurrentDomain(state),
    selected: getSelectedNavigation(state),
  }),
  (dispatch) => ({
    select: (payload) => dispatch(selectItem(payload)),
  })
)(Navigation);
