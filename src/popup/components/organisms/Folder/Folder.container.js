import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  addOverride as addOverrideAction,
  removeFolder as removeFolderAction,
  addFolder as addFolderAction,
} from 'store/nodes/actions';
import { selectNode as selectNodeAction } from 'store/selected/actions';
import {
  updateNode as updateNodeAction,
  importData,
} from 'store/nodes/actions';
import { getNodeForExport } from 'store/nodes/selectors';
import { exportAsFile } from 'utils/import-export';
import { getParentId } from 'store/nodes/selectors';

import Folder from './Folder';
const FolderContainer = (props = {}) => {
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
  const updateNode = (payload) =>
    dispatch(updateNodeAction(Object.assign({ id: props.id }, payload)));

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

  const exported = useSelector(getNodeForExport(props.id), shallowEqual);
  const doExport = () => {
    exportAsFile(exported, props.name);
  };
  const doImport = (data) => {
    dispatch(importData({ to: props.id, data }));
  };

  return (
    <Folder
      {...props}
      addOverride={addOverride}
      removeFolder={removeFolder}
      addFolder={addFolder}
      updateNode={updateNode}
      doExport={doExport}
      doImport={doImport}
    />
  );
};

export default FolderContainer;
