import React, { useState } from 'react';
import cn from 'classnames';
import RequestCard from 'molecules/RequestCard/RequestCard';
import Input from 'atoms/Input/Input';
import Pagination from 'atoms/Pagination/Pagination';
import './RequestsList.css';
import { usePrevious } from 'app/hooks/usePrevious';
import AggregatedRequestCard from '../AggregatedRequestCard/AggregatedRequestCard';
import Pill from '../../atoms/Pill/Pill';
import Icons from '../../atoms/Icons/Icons';
import Switch from '../../atoms/Switch/Switch';

// TODO: refactor to Allow list
const KEY_SEARCH_BLOCK_LIST = {
  responseType: 'responseType',
};

const filterRequests = (tokens, requests) => {
  let filteredRequests = requests;
  for (let token of tokens.filter((t) => !!t && !!t.value)) {
    const isNegation = token.negation;
    let searchRegexp = null;
    try {
      searchRegexp = new RegExp(token.value);
    } catch (e) {
      // // handled in validation
    }
    filteredRequests = filteredRequests.filter((item) => {
      for (let key of Object.keys(item)) {
        if (!(key in KEY_SEARCH_BLOCK_LIST) && searchRegexp.test(item[key])) {
          return !isNegation;
        }
      }
      return isNegation;
    });
  }
  return filteredRequests;
};

const ITEMS_PER_PAGE = 40;

const getPageSlice = (requests, currentPage) =>
  requests
    ? [...requests].slice(
        ITEMS_PER_PAGE * (currentPage - 1),
        ITEMS_PER_PAGE * currentPage,
      )
    : [];

const RequestsList = ({ className, onSelect, onAnalyse, ...otherProps }) => {
  const requests = otherProps.requests ? [...otherProps.requests] : [];
  const [searchValue, setSearchValue] = useState('');
  const [searchTokens, setSearchTokens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [negateFilter, setNegateFilter] = useState(false);
  let hasValidSearch = true;
  let searchRegexp = null;
  try {
    searchRegexp = new RegExp(
      searchTokens
        .filter(({ negation }) => !negation)
        .map(({ value }) => value)
        .join('|'),
    );
  } catch (e) {
    hasValidSearch = false;
  }
  const sortedRequests = requests.sort(
    (a, b) => b?.sentTimestamp - a?.sentTimestamp,
  );
  const lastFirstItem = usePrevious(
    sortedRequests?.length && sortedRequests[0]?.id,
  );
  const currentFirstItem = sortedRequests?.length && sortedRequests[0]?.id;
  const shallAnimateFirstItem = lastFirstItem !== currentFirstItem;
  const filteredItems = filterRequests(searchTokens, sortedRequests);
  const aggregated = aggregateFiltered(filteredItems);
  const totalPages = Math.ceil(
    aggregated?.length ? aggregated?.length / ITEMS_PER_PAGE : 0,
  );
  const displayedPage = Math.min(totalPages, Math.max(0, currentPage));
  return (
    <div className={cn('wmax', className)}>
      <h3 className="mb2">Requests</h3>
      <p>Select a request to override</p>
      <div className="ffr">
        <Input
          label="Search"
          className="requests-list__search-input"
          value={searchValue}
          onChange={(newValue) => {
            const copy = [...searchTokens];
            copy.pop();
            setSearchValue(newValue);
            setSearchTokens([
              ...copy,
              { value: newValue, negation: negateFilter },
            ]);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setSearchTokens([...searchTokens, '']);
              setSearchValue('');
            }
          }}
          validate={() => (!hasValidSearch ? 'Is not a valid regexp' : null)}
        />
        {/* <Button className="ml3 requests-list__filter-button" secondary>
          <Icons.Filter className="mr1 icon_md" />
          Filter
        </Button> */}
      </div>
      <div className="filter-switch mt1 mb1">
        <Switch
          onChange={() => {
            const copy = [...searchTokens];
            const old = copy.pop();
            const newValue = old?.newValue ?? searchValue;
            setNegateFilter(!negateFilter);
            setSearchTokens([
              ...copy,
              { value: newValue, negation: !negateFilter },
            ]);
          }}
        />
        Negate filter
      </div>
      <div className="requests-list__filters mt2">
        {searchTokens.map(
          (token, index) =>
            token.value && (
              <Pill
                key={index}
                onClick={() => {
                  const copy = [...searchTokens];
                  copy.splice(index, 1);
                  setSearchTokens(copy);
                }}
                text={
                  <>
                    {token.negation && 'NOT: '}
                    {token.value}
                    <Icons.Cross className="icon_sm ml1" />
                  </>
                }
              />
            ),
        )}
      </div>
      <div className="requests-list__requests mt6">
        {aggregated &&
          getPageSlice(aggregated, displayedPage).map((request, id) =>
            Array.isArray(request) ? (
              <AggregatedRequestCard
                requests={request}
                onSelect={onSelect}
                onAnalyse={onAnalyse}
                shallAnimateFirstItem={shallAnimateFirstItem}
                searchRegexp={searchRegexp}
                currentFirstItem={currentFirstItem}
              />
            ) : (
              <RequestCard
                {...request}
                id={request.id ?? id}
                className="mb2"
                key={request.id}
                onClick={onSelect}
                onAnalyse={() => onAnalyse(request)}
                searchRegexp={searchRegexp}
                shallAnimate={
                  shallAnimateFirstItem && request.id === currentFirstItem
                }
              />
            ),
          )}
        <Pagination
          totalPages={totalPages}
          currentPage={displayedPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const aggregateFiltered = (filteredItems) => {
  let result = [];
  for (let item of filteredItems) {
    const prev = result.pop();
    if (Array.isArray(prev)) {
      if (prev[0]?.url === item?.url) {
        prev.push(item);
        result.push(prev);
        continue;
      }
      result.push(prev);
      result.push(item);
    } else {
      if (prev?.url === item?.url) {
        result.push([prev, item]);
      } else {
        if (prev) {
          result.push(prev);
        }
        result.push(item);
      }
    }
  }
  return result;
};

export default RequestsList;
