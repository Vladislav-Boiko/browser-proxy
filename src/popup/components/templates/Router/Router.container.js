import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getAllNodes } from 'store/nodes/selectors';
import {
  getSelectedNodeId,
  getSelectedNode,
  getAnalysedRequest,
  getCurrentDomain,
} from 'store/selected/selectors';
import {
  selectNode as selectNodeAction,
  analyseNode as analyseNodeAction,
} from 'store/selected/actions';
import { toggleNode as toggleNodeAction } from 'store/nodes/actions';
import Router from './Router';

const RouterContainer = (props) => {
  const nodes = useSelector(getAllNodes, shallowEqual);
  const selectedId = useSelector(getSelectedNodeId, shallowEqual);
  const currentDomain = useSelector(getCurrentDomain, shallowEqual);
  const analysedRequest = useSelector(getAnalysedRequest, shallowEqual);
  const dispatch = useDispatch();
  const setSelectedId = (id) => dispatch(selectNodeAction(id));
  const selectedNode = useSelector(getSelectedNode, shallowEqual);
  const toggleNode = (id) => dispatch(toggleNodeAction(id));
  const stopAnalysing = () => dispatch(analyseNodeAction(''));
  return (
    <Router
      nodes={nodes}
      selectedId={selectedId}
      analysedRequest={analysedRequest}
      currentDomain={currentDomain}
      selectedNode={selectedNode}
      setSelectedId={setSelectedId}
      toggleNode={toggleNode}
      stopAnalysing={stopAnalysing}
      {...props}
    />
  );
};

export default RouterContainer;
