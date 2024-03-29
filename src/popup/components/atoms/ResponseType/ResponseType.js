import React from 'react';
import Icons from '../Icons/Icons';
import cn from 'classnames';
import './ResponseType.css';

export const TYPES = {
  JSON: 'JSON',
  ARRAY_BUFFER: 'ARRAYBUFFER',
  BLOB: 'BLOB',
  TEXT: 'TEXT',
  DOCUMENT: 'DOCUMENT',
};

const ResponseType = ({ name, type, className }) => {
  let Icon = Icons.Domain;
  switch (type?.toUpperCase()) {
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
      Icon = Icons.Text;
  }
  return (
    <span className={cn('response-type g2-color', className)}>
      <Icon className="icon_md mr1 response-type__icon" />
      <span>{name || type || TYPES.TEXT}</span>
    </span>
  );
};

export default ResponseType;
