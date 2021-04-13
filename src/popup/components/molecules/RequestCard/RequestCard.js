import React, { useState } from 'react';
import cn from 'classnames';
import Pill from 'atoms/Pill/Pill';
import ResponseType from 'atoms/ResponseType/ResponseType';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import Tabs from 'atoms/Tabs/Tabs';
import { getTotalResponse } from '../../../../common/utils';
import './RequestCard.css';

const SplitBy = ({ text, delimiter }) => {
  if (!text) {
    return '';
  }
  const splitted = text.split(delimiter);
  return splitted.map((part, i) => (
    <p key={`url-param-${i}`}>
      {i === 0 ? (
        <b className="url-param__base">{part}</b>
      ) : (
        <React.Fragment>
          <span className="url-param__key">{part.split('=')[0]}</span> ={' '}
          <span className="url-param__value">{part.split('=')[1]}</span>
        </React.Fragment>
      )}
      {i !== splitted.length - 1 && (i === 0 ? '?' : ' &')}
    </p>
  ));
};

const stripURL = (url = '') => {
  const chunks = url.split('?')[0].split('/');
  let lastPart = chunks[chunks.length - 1];
  if (chunks.length > 1 && chunks[chunks.length - 2]) {
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
  isProxied,
  ...otherProps
}) => {
  let loadingState = LOADING_STATES.LOADING;
  // TODO: what about fetch requests?
  if (readyState === 4 || responseCode) {
    if (responseCode === 0 || responseCode === '0') {
      loadingState = LOADING_STATES.FAIL;
    } else {
      loadingState = LOADING_STATES.LOADED;
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('responseBody');
  const doOverride = () => {
    onClick &&
      onClick({
        name: stripURL(url),
        url,
        responseCode,
        method,
        responseType,
        readyState,
        isProxied,
        ...otherProps,
      });
  };
  return (
    <div
      className={cn('request-card wmax', className, {
        'request-card_open': isOpen,
        'request-card_proxied': isProxied,
      })}
      onClick={() => setIsOpen(true)}
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
      {isOpen && (
        <div className="request-card__body mb1">
          <div className="ffr card-body__header mt3 mb5">
            <button
              className="card-body__close py1"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <h3>
                <Icons.Chevron className="icon_sm mr1 chevron_up" /> Preview
              </h3>
            </button>
            <Button
              primary
              onClick={doOverride}
              Icon={Icons.Chevron}
              iconLeft
              iconClass="override__icon"
            >
              {isProxied ? 'To override' : 'Override'}
            </Button>
          </div>
          <span className="label_weak">
            <SplitBy text={url} delimiter={/\?|&/g} />
          </span>
          <Tabs
            onSelect={setSelectedTab}
            className="mt2"
            tabs={[
              { name: 'Response', id: 'responseBody' },
              { name: 'Request', id: 'requestBody' },
            ]}
            selectedTab={selectedTab}
          />
          <Input
            className="tabbed__input"
            disabled
            value={getTotalResponse(otherProps[selectedTab])}
            multiline
          />
        </div>
      )}
    </div>
  );
};

export default RequestCard;
