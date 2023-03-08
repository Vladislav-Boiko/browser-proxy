import React, { useState } from 'react';
import cn from 'classnames';
import Button from '../../atoms/Button/Button';
import Icons from '../../atoms/Icons/Icons';
import Pill from '../../atoms/Pill/Pill';
import RequestCard, { RequestCardUrl } from '../RequestCard/RequestCard';

import './AggregatedRequestCard.css';
const AggregatedRequestCard = ({
  requests,
  onSelect,
  onAnalyse,
  searchRegexp,
  shallAnimateFirstItem,
  currentFirstItem,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const responseCode = requests.reduce((acc, { responseCode }) => {
    if (acc === 0) {
      return responseCode;
    }
    return acc === responseCode;
  }, 0)
    ? requests[0]?.responseCode
    : 'mixed';
  const hasError = requests.reduce(
    (acc, i) => acc || /[5|4]\d\d/.test('' + i.responseCode),
    false,
  );
  return (
    <div className="aggregated-requests">
      <div className="aggregated-requests__top">
        <RequestCardUrl
          className="aggregated-requests__header"
          url={requests[0]?.url ?? ''}
          searchRegexp={searchRegexp}
        />
        <Pill
          className={cn('request-card__pill', {
            pill_error: hasError,
          })}
          text={responseCode}
        />
      </div>
      <Button
        className="mb1"
        tretiary
        Icon={isExpanded ? Icons.Cross : Icons.Add}
        onClick={() => setExpanded(!isExpanded)}
      >
        {`${requests.length} Subsequent Requests `}
      </Button>
      {isExpanded &&
        requests.map((request, id) => (
          <RequestCard
            {...request}
            id={request.id ?? id}
            className="mb2"
            key={request.id}
            onClick={onSelect}
            onAnalyse={() => onAnalyse(request)}
            searchRegexp={searchRegexp}
            shallAnimate={
              shallAnimateFirstItem && (request.id ?? id) === currentFirstItem
            }
          />
        ))}
    </div>
  );
};

export default AggregatedRequestCard;
