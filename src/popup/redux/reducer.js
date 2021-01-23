import { combineReducers } from 'redux';
import nodes from './nodes/reducer';
import selected from './selected/reducer';
import requests from './requests/reducer';
import activeWindows from './activeWindows/reducer';

export default combineReducers({
  nodes,
  selected,
  requests,
  activeWindows,
});
