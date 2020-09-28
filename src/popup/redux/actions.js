import { NAV_TYPES } from "../components/Navigation/NavigationTypes";

export const ADD_REQUESTS = "ADD_REQUESTS";
export const addRequests = (requests) => ({
  type: ADD_REQUESTS,
  payload: { requests },
});

export const TOGGLE_REQUEST = "TOGGLE_REQUEST";
export const toggleRequest = (id) => ({
  type: TOGGLE_REQUEST,
  payload: id,
});

export const OPEN_OVERRIDE = "OPEN_OVERRIDE";
export const openOverride = (id) => ({
  type: OPEN_OVERRIDE,
  payload: { domainsOpen: { [id]: true } },
});

export const CLOSE_OVERRIDE = "CLOSE_OVERRIDE";
export const closeOverride = (id) => ({
  type: CLOSE_OVERRIDE,
  payload: { domainsOpen: { [id]: false } },
});

export const SAVE_OVERRIDE = "SAVE_OVERRIDE";
export const saveOverride = (id, override) => ({
  type: SAVE_OVERRIDE,
  payload: {
    id,
    override,
  },
});

export const REMOVE_OVERRIDE = "REMOVE_OVERRIDE";
export const removeOverride = (id) => ({
  type: REMOVE_OVERRIDE,
  payload: {
    id,
  },
});

export const LOAD_OVERRIDES = "LOAD_OVERRIDES";
export const loadOverrides = (domains) => ({
  type: LOAD_OVERRIDES,
  payload: { domains },
});

export const SET_TAB_DOMAIN = "SET_TAB_DOMAIN";
export const setTabDomain = (tabDomain) => ({
  type: SET_TAB_DOMAIN,
  payload: {
    tabDomain,
    selectedNavigation: { id: tabDomain, type: NAV_TYPES.DOMAIN },
  },
});

export const SET_SELECTED_NAVIGATION = "SET_SELECTED_NAVIGATION";
export const selectNavigation = (payload) => ({
  type: SET_SELECTED_NAVIGATION,
  payload: { selectedNavigation: payload },
});
