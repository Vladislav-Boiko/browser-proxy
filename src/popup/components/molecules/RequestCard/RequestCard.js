import React from 'react';
import cn from 'classnames';
import Pill from 'atoms/Pill/Pill';
import ResponseType from 'atoms/ResponseType/ResponseType';

const stripURL = (url = '') => {
  const chunks = url.split('?')[0].split('/');
  let lastPart = chunks[chunks.length - 1];
  if (chunks.length > 1 && chunks[chunks.length - 2]) {
    lastPart = chunks[chunks.length - 2] + '/' + lastPart;
  }
  return lastPart;
};

import './RequestCard.css';
const RequestCard = ({ url, code, method, responseType, className }) => {
  return (
    <button className={cn('request-card', className)}>
      <h3 className="request-card__url">{stripURL(url)}</h3>
      <Pill text={code} className="request-card__pill" />
      <span className="request-card__method g2-color label_strong">
        {method.toUpperCase()}
      </span>
      <ResponseType
        type={responseType}
        className="request-card__response-type label_strong"
      />
    </button>
  );
};

export default RequestCard;
