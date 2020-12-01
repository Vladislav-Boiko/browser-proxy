import React from 'react';
import Icons from '../Icons/Icons';
import cn from 'classnames';

export const TYPES = {
  JSON: 'JSON',
  ARRAY_BUFFER: 'ArrayBuffer',
  BLOB: 'BLOB',
  TEXT: 'TEXT',
  DOCUMENT: 'Document',
};

import './ResponseType.css';
const ResponseType = ({ type, className }) => {
  let Icon = Icons.Domain;
  switch (type) {
    case TYPES.JSON:
      Icon = () => (
        <span className="mr1 response-type__icon label_weak">{'{;}'}</span>
      );
      break;
    case TYPES.ARRAY_BUFFER:
      Icon = Icons.ArrayBuffer;
      break;
    case TYPES.TEXT:
      Icon = Icons.Text;
      break;
    case TYPES.BLOB:
    case TYPES.DOCUMENT:
    default:
      Icon = Icons.File;
  }
  return (
    <span className={cn('response-type g2-color', className)}>
      <Icon className="icon_md mr1 response-type__icon" />
      <span>{type}</span>
    </span>
  );
};

export default ResponseType;
