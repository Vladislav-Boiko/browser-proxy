import React, { useState } from 'react';
import cn from 'classnames';
import RequestCard from '../RequestCard/RequestCard';
import Input from 'atoms/Input/Input';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';

const KEY_SEARCH_BLOCK_LIST = {
  responseType: 'responseType',
};

const filterRequests = (searchValue, requests) => {
  if (!searchValue) {
    return requests;
  }
  const searchRegExp = new RegExp(searchValue);
  return requests.filter((item) => {
    for (let key of Object.keys(item)) {
      if (!(key in KEY_SEARCH_BLOCK_LIST) && searchRegExp.test(item[key])) {
        return true;
      }
    }
    return false;
  });
};

import './RequestsList.css';
const RequestsList = ({ requests, className }) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className={cn('requests-list', className)}>
      <h3 className="mb2">Requests</h3>
      <div className="requests-list__search">
        <Input
          label="Search"
          className="requests-list__search-input"
          value={searchValue}
          onChange={setSearchValue}
        />
        <Button className="ml3 requests-list__filter-button" secondary>
          <Icons.Filter className="mr1 icon_md" />
          Filter
        </Button>
      </div>
      <div className="requests-list__filters"></div>
      <div className="requests-list__reqeusts mt6">
        {requests &&
          filterRequests(searchValue, requests)
            .map((request, id) => ({ ...request, id }))
            .map((request) => (
              <RequestCard {...request} className="mb2" key={request.id} />
            ))}
      </div>
    </div>
  );
};

export default RequestsList;
