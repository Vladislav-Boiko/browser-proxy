import React from 'react';
import cn from 'classnames';
import RequestsList from 'molecules/RequestsList/RequestsList';

import '../Domain.css';
const DomainRequests = ({ requests, className }) => {
  return (
    <div className={cn('wmax', className)}>
      <RequestsList className="mt3" requests={requests} />
    </div>
  );
};

export default DomainRequests;
