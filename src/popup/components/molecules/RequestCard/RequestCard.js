import React from 'react';
import cn from 'classnames';
import Pill from 'atoms/Pill/Pill';
import ResponseType from 'atoms/ResponseType/ResponseType';
import './RequestCard.css';

const stripURL = (url = '') => {
  const chunks = url.split('?')[0].split('/');
  let lastPart = chunks[chunks.length - 1];
  if (
    chunks.length > 1 &&
    chunks[chunks.length - 2] &&
    chunks[chunks.length - 2].length > 11
  ) {
    lastPart = chunks[chunks.length - 2] + '/' + lastPart;
  }
  if (lastPart.length > 20) {
    lastPart = lastPart.slice(-20);
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
  responseCode,
  method,
  responseType,
  readyState,
  className,
  onClick,
  ...otherProps
}) => {
  console.log({
    url,
    responseCode,
    method,
    responseType,
    readyState,
    className,
    onClick,
    ...otherProps,
  });
  let loadingState = LOADING_STATES.LOADING;
  // TODO: what about fetch requests?
  if (readyState === 4 || responseCode) {
    if (responseCode === 0 || responseCode === '0') {
      loadingState = LOADING_STATES.FAIL;
    } else {
      loadingState = LOADING_STATES.LOADED;
    }
  }
  return (
    <button
      className={cn('request-card wmax', className)}
      onClick={() => {
        onClick &&
          onClick({
            name: stripURL(url),
            url,
            responseCode,
            method,
            responseType,
            readyState,
            ...otherProps,
          });
      }}
    >
      <h3 className="request-card__url">{stripURL(url)}</h3>
      {loadingState === LOADING_STATES.LOADED && (
        <Pill text={responseCode} className="request-card__pill" />
      )}
      {loadingState === LOADING_STATES.FAIL && (
        <Pill text={'FAILED'} className="request-card__pill pill_error" />
      )}
      {loadingState === LOADING_STATES.LOADING && (
        <Pill text={'...'} className="request-card__pill" />
      )}
      <span className="request-card__method g2-color label_strong">
        {method ? method.toUpperCase() : 'GET'}
      </span>
      <ResponseType
        type={responseType}
        className="request-card__response-type label_strong"
      />
    </button>
  );
};

export default RequestCard;
