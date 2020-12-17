import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  addOverride as addOverrideAction,
  removeFolder as removeFolderAction,
} from 'store/nodes/actions';
import { selectNode as selectNodeAction } from 'store/selected/actions';
import { getParentId } from 'store/nodes/selectors';

import Folder from './Folder';
const FolderContainer = (props) => {
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

  const parentId = useSelector(getParentId(props.id), shallowEqual);
  const removeFolder = () => {
    dispatch(removeFolderAction(props.id));
    dispatch(selectNodeAction(parentId));
  };
  return (
    <Folder {...props} addOverride={addOverride} removeFolder={removeFolder} />
  );
};

export default FolderContainer;
