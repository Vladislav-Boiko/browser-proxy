import React from 'react';
import Domain from './Domain/Domain';
import Folder from './Folder/Folder';
import Xhr from './Xhr/Xhr';
import cn from 'classnames';
import { METHODS } from 'app/utils/constants';

export const XHR_TYPES = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  TRACE: 'TRACE',
};

export const TYPES = {
  DOMAIN: 'DOMAIN',
  FOLDER: 'FOLDER',
  ...XHR_TYPES,
};

const Node = (props) => {
  const { type, className } = props;
  const normalizedType = type?.toUpperCase() || METHODS[0];
  let depth = props.depth !== undefined ? props.depth + 1 : 0;
  const nodeClassName = cn(className, `ml${depth}`, 'treeView__child');
  props = { ...props, depth, className: nodeClassName };
  if (normalizedType in XHR_TYPES) {
    return <Xhr {...props} />;
  }
  switch (normalizedType) {
    case TYPES.DOMAIN:
      return <Domain {...props} />;
    case TYPES.FOLDER:
      return <Folder {...props} />;
    default:
      return `Unknown type ${normalizedType}`;
  }
};

export default Node;
