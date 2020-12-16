import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { removeOverride as removeOverrideAction } from 'store/nodes/actions';
import { selectNode as selectNodeAction } from 'store/selected/actions';
import { getParentId } from 'store/nodes/selectors';

import Request from './Request';
const RequestContainer = (props) => {
  const dispatch = useDispatch();
  const parentId = useSelector(getParentId(props.id), shallowEqual);
  const removeOverride = () => {
    dispatch(removeOverrideAction(props.id));
    dispatch(selectNodeAction(parentId));
  };
  return <Request {...props} removeOverride={removeOverride} />;
};

export default RequestContainer;
