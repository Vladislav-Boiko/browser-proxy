import React, { useState } from 'react';
import cn from 'classnames';
import RequestCard from 'molecules/RequestCard/RequestCard';
import Input from 'atoms/Input/Input';
import Pagination from 'atoms/Pagination/Pagination';
import './RequestsList.css';
import { usePrevious } from 'app/hooks/usePrevious';

// TODO: refactor to Allow list
const KEY_SEARCH_BLOCK_LIST = {
  responseType: 'responseType',
};

const filterRequests = (searchRegexp, requests) => {
  if (!searchRegexp) {
    return [];
  }
  try {
    return requests.filter((item) => {
      for (let key of Object.keys(item)) {
        if (!(key in KEY_SEARCH_BLOCK_LIST) && searchRegexp.test(item[key])) {
          return true;
        }
      }
      return false;
    });
  } catch (e) {
    // handled in validation
  }
  return [];
};

const ITEMS_PER_PAGE = 20;

const getPageSlice = (requests, currentPage) =>
  requests
    ? [...requests].slice(
        ITEMS_PER_PAGE * (currentPage - 1),
        ITEMS_PER_PAGE * currentPage,
      )
    : [];

const RequestsList = ({ className, onSelect, ...otherProps }) => {
  const requests = otherProps.requests ? [...otherProps.requests] : [];
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  let searchRegexp = null;
  try {
    searchRegexp = new RegExp(searchValue);
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
  const filteredItems = filterRequests(searchRegexp, sortedRequests);
  const totalPages = Math.ceil(
    filteredItems?.length ? filteredItems?.length / ITEMS_PER_PAGE : 0,
  );
  const displayedPage = Math.min(totalPages, Math.max(0, currentPage));
  let hasValidSearch = true;
  return (
    <div className={cn('wmax', className)}>
      <h3 className="mb2">Requests</h3>
      <p>Select a request to override</p>
      <div className="ffr">
        <Input
          label="Search"
          className="requests-list__search-input"
          value={searchValue}
          onChange={(newValue) => setSearchValue(newValue)}
          validate={() => (!hasValidSearch ? 'Is not a valid regexp' : null)}
        />
        {/* <Button className="ml3 requests-list__filter-button" secondary>
          <Icons.Filter className="mr1 icon_md" />
          Filter
        </Button> */}
      </div>
      <div className="requests-list__filters"></div>
      <div className="requests-list__reqeusts mt6">
        {requests &&
          getPageSlice(filteredItems, displayedPage)
            .map((request, id) => (request.id ? request : { ...request, id }))
            .map((request) => (
              <RequestCard
                {...request}
                className="mb2"
                key={request.id}
                onClick={onSelect}
                searchRegexp={searchRegexp}
                shallAnimate={
                  shallAnimateFirstItem && request.id === currentFirstItem
                }
              />
            ))}
        <Pagination
          totalPages={totalPages}
          currentPage={displayedPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default RequestsList;
