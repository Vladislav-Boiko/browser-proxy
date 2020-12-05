import React from 'react';
import { connect } from 'react-redux';
import { updateOverride, removeOverride } from '../../redux/overrides/actions';
import { removeItem } from '../../redux/folders/actions';
import { serialize } from '../../redux/storage/actions';
import {
  getSelectedOverride,
  getSelectedNavigation,
} from '../../redux/selectors';
import { v4 as uuid } from 'uuid';
import './SelectedOverride.css';
import Override from '../../components/Overrride/Override';
import Button from '../../components/atoms/Button/Button';

export const SelectedOverride = ({ override, save, remove, navItem }) => {
  // TODO: move the buttons markup out of the containers.
  return (
    <React.Fragment>
      <Override
        save={(override) => save(uuid(), override)}
        override={override}
      />
      <Button className="delete-button" onClick={() => remove(navItem)}>
        Delete
      </Button>
    </React.Fragment>
  );
};

export default connect(
  (state) => ({
    override: getSelectedOverride(state),
    navItem: getSelectedNavigation(state),
  }),
  (dispatch) => ({
    save: (id, override) => {
      dispatch(updateOverride(id, override));
      dispatch(serialize());
    },
    remove: (navItem) => {
      dispatch(removeOverride(navItem.id));
      dispatch(removeItem(navItem));
      dispatch(serialize());
    },
  }),
)(SelectedOverride);
