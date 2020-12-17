import React from 'react';
import { v4 as uuid } from 'uuid';
import EnabledDomain from './EnabledDomain';
import { useDispatch } from 'react-redux';
import {
  addOverride as addOverrideAction,
  addFolder as addFolderAction,
  removeDomain as removeDomainAction,
} from 'store/nodes/actions';
import { selectNode as selectNodeAction } from 'store/selected/actions';

const Domain = (props) => {
  const dispatch = useDispatch();
  const addOverride = () => {
    const id = uuid();
    dispatch(
      addOverrideAction({
        parentId: props.id,
        override: {
          id,
        },
      }),
    );
    dispatch(selectNodeAction(id));
  };

  const addFolder = () => {
    const id = uuid();
    dispatch(
      addFolderAction({
        parentId: props.id,
        folder: {
          id,
        },
      }),
    );
    dispatch(selectNodeAction(id));
  };

  const removeDomain = () => dispatch(removeDomainAction(props.id));
  return (
    <EnabledDomain
      {...props}
      addOverride={addOverride}
      addFolder={addFolder}
      removeDomain={removeDomain}
    />
  );
};

export default Domain;