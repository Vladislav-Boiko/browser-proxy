import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getAllNodes } from 'store/nodes/selectors';
import { getSelectedNodeID, getSelectedNode } from 'store/selected/selectors';
import { selectNode as selectNodeAction } from 'store/selected/actions';
import { toggleNode as toggleNodeAction } from 'store/nodes/actions';
import Router from './Router';

const RouterContainer = (props) => {
  const nodes = useSelector(getAllNodes, shallowEqual);
  const selectedId = useSelector(getSelectedNodeID, shallowEqual);
  const dispatch = useDispatch();
  const setSelectedId = (id) => dispatch(selectNodeAction(id));
  const selectedNode = useSelector(getSelectedNode, shallowEqual);
  const toggleNode = (id) => dispatch(toggleNodeAction(id));

  return (
    <Router
      nodes={nodes}
      selectedId={selectedId}
      selectedNode={selectedNode}
      setSelectedId={setSelectedId}
      toggleNode={toggleNode}
      {...props}
    />
  );
};

export default RouterContainer;
