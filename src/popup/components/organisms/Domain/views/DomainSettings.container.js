import React from 'react';
import Domain from './DomainSettings';
import { useDispatch } from 'react-redux';
import { updateNode as updateNodeAction } from 'store/nodes/actions';

const DomainContainer = (props) => {
  const dispatch = useDispatch();
  const updateNode = (payload) => dispatch(updateNodeAction(payload));
  return <Domain {...props} updateNode={updateNode} />;
};

export default DomainContainer;
