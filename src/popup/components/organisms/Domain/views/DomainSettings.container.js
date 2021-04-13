import React from 'react';
import Domain from './DomainSettings';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  updateNode as updateNodeAction,
  importData,
} from 'store/nodes/actions';
import { getNodeForExport } from 'store/nodes/selectors';
import { exportAsFile } from 'utils/import-export';

const DomainContainer = (props) => {
  const dispatch = useDispatch();
  const updateNode = (payload) => dispatch(updateNodeAction(payload));
  const exported = useSelector(getNodeForExport(props.id), shallowEqual);
  const doExport = () => {
    exportAsFile(exported, props.name);
  };
  const doImport = (data) => {
    dispatch(importData({ to: props.id, data }));
  };
  return (
    <Domain
      {...props}
      updateNode={updateNode}
      doExport={doExport}
      doImport={doImport}
    />
  );
};

export default DomainContainer;
