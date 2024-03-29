import React from 'react';
import { v4 as uuid } from 'uuid';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getAllNodes } from 'store/nodes/selectors';
import {
  getSelectedNodeId,
  getCurrentDomain,
  getSelectedNode,
} from 'store/selected/selectors';
import {
  addDomain as addDomainAction,
  moveNode as moveNodeAction,
  duplicateNode as duplicateNodeAction,
  removeOverride as removeNodeAction,
} from 'store/nodes/actions';
import { selectNode as selectNodeAction } from 'store/selected/actions';

import TreeView, {
  TYPES as TREE_TYPES,
  XHR_TYPES as XHR_TREE_TYPES,
} from './TreeView';

const TreeViewContainer = (props) => {
  const nodes = useSelector(getAllNodes, shallowEqual);
  const currentDomain = useSelector(getCurrentDomain, shallowEqual);
  const selectedNodeId = useSelector(getSelectedNodeId, shallowEqual);
  const selectedNode = useSelector(getSelectedNode, shallowEqual);
  const dispatch = useDispatch();
  const addDomain = () => {
    const id = uuid();
    dispatch(
      addDomainAction({
        name: 'New Domain',
        id,
        type: TYPES.DOMAIN,
        isUnsaved: false,
        isOn: true,
      }),
    );
    dispatch(selectNodeAction(id));
  };
  const moveNode = (payload) => dispatch(moveNodeAction(payload));
  const duplicateNode = (payload) => dispatch(duplicateNodeAction(payload));
  const removeNode = (payload) => dispatch(removeNodeAction(payload));
  return (
    <TreeView
      nodes={nodes}
      {...props}
      addDomain={addDomain}
      moveNode={moveNode}
      selectedId={selectedNodeId}
      selectedNode={selectedNode}
      currentDomain={currentDomain}
      duplicateNode={duplicateNode}
      removeNode={removeNode}
    />
  );
};

export const TYPES = TREE_TYPES;
export const XHR_TYPES = XHR_TREE_TYPES;
export default TreeViewContainer;
