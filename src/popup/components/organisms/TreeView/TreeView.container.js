import React from 'react';
import { v4 as uuid } from 'uuid';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getAllNodes } from 'store/nodes/selectors';
import { getSelectedNodeID } from 'store/selected/selectors';
import { addDomain as addDomainAction } from 'store/nodes/actions';
import { selectNode as selectNodeAction } from 'store/selected/actions';

import TreeView, {
  TYPES as TREE_TYPES,
  XHR_TYPES as XHR_TREE_TYPES,
} from './TreeView';

const TreeViewContainer = (props) => {
  const nodes = useSelector(getAllNodes, shallowEqual);
  const selectedNodeId = useSelector(getSelectedNodeID, shallowEqual);
  const dispatch = useDispatch();
  const addDomain = () => {
    const id = uuid();
    dispatch(
      addDomainAction({
        name: 'New Domain',
        id,
        type: TYPES.DOMAIN,
        isUnsaved: true,
        isOn: true,
      }),
    );
    dispatch(selectNodeAction(id));
  };

  return (
    <TreeView
      nodes={nodes}
      {...props}
      addDomain={addDomain}
      selectedId={selectedNodeId}
    />
  );
};

export const TYPES = TREE_TYPES;
export const XHR_TYPES = XHR_TREE_TYPES;
export default TreeViewContainer;
