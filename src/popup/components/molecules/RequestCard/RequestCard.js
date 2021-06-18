import React, { useState } from 'react';
import cn from 'classnames';
import Pill from 'atoms/Pill/Pill';
import ResponseType from 'atoms/ResponseType/ResponseType';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import Tabs from 'atoms/Tabs/Tabs';
import { getTotalResponse } from '../../../../common/utils';
import highlight from 'atoms/Text/TextWithHighlight';
import { motion, AnimatePresence } from 'framer-motion';
import './RequestCard.css';
import { METHODS } from 'app/utils/constants';

const SplitBy = ({ text, delimiter, searchRegexp }) => {
  if (!text) {
    return '';
  }
  const splitted = text.split(delimiter);
  return splitted
    .map((part) => decodeURIComponent(part))
    .map((part, i) => (
      <p key={`url-param-${i}`}>
        {i === 0 ? (
          <b className="url-param__base">{highlight(part, searchRegexp)}</b>
        ) : (
          <React.Fragment>
            <span className="url-param__key">
              {highlight(part.split('=')[0], searchRegexp)}
            </span>{' '}
            ={' '}
            <span className="url-param__value">
              {highlight(part.split('=')[1], searchRegexp)}
            </span>
          </React.Fragment>
        )}
        {highlight(
          i !== splitted.length - 1 && (i === 0 ? '?' : ' &'),
          searchRegexp,
        )}
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
  onAnalyse,
  isProxied,
  searchRegexp,
  shallAnimate = false,
  ...otherProps
}) => {
  let loadingState = LOADING_STATES.LOADING;
  if (readyState === 4 || responseCode) {
    if (responseCode === 0 || responseCode === '0') {
      loadingState = LOADING_STATES.FAIL;
    } else {
      loadingState = LOADING_STATES.LOADED;
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('responseBody');
  const doOverride = (id) => {
    onClick &&
      onClick({
        name: stripURL(url),
        url,
        responseCode,
        method,
        type: method?.toUpperCase() || otherProps.type || METHODS[0],
        responseType,
        readyState,
        isProxied,
        ...otherProps,
        id,
      });
  };
  const doAnalyse = () => onAnalyse && onAnalyse();
  const canShowTextPreview =
    ['TEXT', 'JSON', 'DOCUMENT'].indexOf(responseType?.toUpperCase()) >= 0;
  return (
    <AnimatePresence
      initial={shallAnimate && loadingState === LOADING_STATES.LOADING}
    >
      <motion.div
        initial={{
          backgroundColor: '#f3f5fb',
        }}
        animate={{ backgroundColor: '#ffffff' }}
        exit={{ backgroundColor: '#ffffff' }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
        className={cn('request-card wmax', className, {
          'request-card_open': isOpen,
          'request-card_proxied': isProxied,
        })}
        onClick={() => setIsOpen(true)}
      >
        <h3 className="request-card__url">
          {highlight(stripURL(url), searchRegexp)}
        </h3>
        {loadingState === LOADING_STATES.LOADED && (
          <Pill
            text={responseCode}
            className={cn('request-card__pill', {
              pill_error: /[5|4]\d\d/.test('' + responseCode),
            })}
          />
        )}
        {loadingState === LOADING_STATES.FAIL && (
          <Pill text={'FAILED'} className="request-card__pill pill_error" />
        )}
        {loadingState === LOADING_STATES.LOADING && (
          <Pill text={'...'} className="request-card__pill" />
        )}
        <span className="request-card__method g2-color label_strong">
          {highlight(method ? method.toUpperCase() : 'GET', searchRegexp)}
        </span>
        <ResponseType
          type={responseType}
          className="request-card__response-type label_strong"
        />
        {isOpen && (
          <div className="request-card__body mb1">
            <div className="ffr card-body__header mt3 mb1">
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
                onClick={() =>
                  doOverride(
                    isProxied ? otherProps?.override?.id : otherProps?.id,
                  )
                }
                Icon={Icons.Chevron}
                iconLeft
                iconClass="override__icon"
              >
                {isProxied ? 'To override' : 'Override'}
              </Button>
            </div>
            <div>
              <Button
                className="analyse mb2"
                tretiary
                Icon={Icons.Chevron}
                iconLeft
                iconClass="analyse__icon"
                onClick={() => doAnalyse()}
              >
                Analyse match
              </Button>
            </div>
            <span className="label_weak">
              <SplitBy
                text={url}
                delimiter={/\?|&/g}
                searchRegexp={searchRegexp}
              />
            </span>
            {canShowTextPreview && (
              <>
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
              </>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestCard;
