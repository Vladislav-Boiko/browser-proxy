import { combineReducers } from 'redux';
import nodes from './nodes/reducer';
import selected from './selected/reducer';

export default combineReducers({
  nodes,
  selected,
});
