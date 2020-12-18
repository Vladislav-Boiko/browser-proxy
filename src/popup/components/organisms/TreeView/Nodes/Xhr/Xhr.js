import React from 'react';
import NodeHoc from '../NodeHoc/NodeHoc';
import NodeName from '../NodeHoc/NodeName';
import './Xhr.css';

const typeToText = (type) => {
  if (type === 'DELETE') {
    return 'DEL';
  }
  if (type === 'OPTIONS') {
    return 'OPT';
  }
  if (type === 'TRACE') {
    return 'TRAC';
  }
  if (type === 'PATCH') {
    return 'PTCH';
  }
  return type;
};

const Xhr = ({ type, name, isUnsaved, ...otherProps }) => {
  return (
    <li>
      <NodeHoc {...otherProps}>
        <span className="xhrNode__type mr1 g4-color">{typeToText(type)}</span>
        <NodeName
          id={otherProps.id}
          className="xhrNode__name"
          name={name}
          isUnsaved={isUnsaved}
        />
      </NodeHoc>
    </li>
  );
};

export default Xhr;
