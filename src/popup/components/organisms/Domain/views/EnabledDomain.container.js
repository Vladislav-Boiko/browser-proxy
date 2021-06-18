import React from 'react';
import { v4 as uuid } from 'uuid';
import EnabledDomain from './EnabledDomain';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  addOverride as addOverrideAction,
  addFolder as addFolderAction,
  removeDomain as removeDomainAction,
  updateNode as updateNodeAction,
} from 'store/nodes/actions';
import {
  selectNode as selectNodeAction,
  analyseNode as analyseNodeAction,
} from 'store/selected/actions';
import { getCurrentDomain } from 'store/selected/selectors';
import { getRequestsForActiveUrls } from 'store/requests/selectors';

const Domain = (props = {}) => {
  const dispatch = useDispatch();
  const requests = useSelector(
    getRequestsForActiveUrls(props.activeUrls),
    shallowEqual,
  );
  const updateNode = (payload) =>
    dispatch(updateNodeAction(Object.assign({ id: props.id }, payload)));
  const currentDomain = useSelector(getCurrentDomain, shallowEqual);
  const addOverride = (overrideProps = {}) => {
    const id = uuid();
    dispatch(
      addOverrideAction({
        parentId: props.id,
        override: {
          ...overrideProps,
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

  const removeDomain = () => {
    dispatch(
      removeDomainAction({
        id: props.id,
        isCurrent: currentDomain === props.id,
      }),
    );
    dispatch(selectNodeAction(currentDomain));
  };

  const selectNode = (id) => dispatch(selectNodeAction(id));

  const onAnalyse = (request) => dispatch(analyseNodeAction(request));

  return (
    <EnabledDomain
      {...props}
      requests={requests}
      addOverride={addOverride}
      selectNode={selectNode}
      addFolder={addFolder}
      removeDomain={removeDomain}
      onAnalyse={onAnalyse}
      updateNode={updateNode}
      isCurrent={currentDomain === props.id}
    />
  );
};

export default Domain;
