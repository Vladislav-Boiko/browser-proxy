import React from 'react';
import cn from 'classnames';
import Pill from 'atoms/Pill/Pill';
import ResponseType from 'atoms/ResponseType/ResponseType';
import './RequestCard.css';

const stripURL = (url = '') => {
  const chunks = url.split('?')[0].split('/');
  let lastPart = chunks[chunks.length - 1];
  if (chunks.length > 1 && chunks[chunks.length - 2]) {
    lastPart = chunks[chunks.length - 2] + '/' + lastPart;
  }
  return lastPart;
};

const LOADING_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAIL: 'fail',
};

const RequestCard = ({
  url,
  code,
  method,
  responseType,
  readyState,
  className,
}) => {
  let loadingState = LOADING_STATES.LOADING;
  // TODO: what about fetch requests?
  if (readyState === 4 || code) {
    if (code === 0) {
      loadingState = LOADING_STATES.FAIL;
    } else {
      loadingState = LOADING_STATES.LOADED;
    }
  }
  return (
    <button className={cn('request-card wmax', className)}>
      <h3 className="request-card__url">{stripURL(url)}</h3>
      {loadingState === LOADING_STATES.LOADED && (
        <Pill text={code} className="request-card__pill" />
      )}
      {loadingState === LOADING_STATES.FAIL && (
        <Pill text={'FAILED'} className="request-card__pill pill_error" />
      )}
      {loadingState === LOADING_STATES.LOADING && (
        <Pill text={'...'} className="request-card__pill" />
      )}
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
