import React from 'react';
import cn from 'classnames';
import RequestsList from 'molecules/RequestsList/RequestsList';

import '../Domain.css';
const DomainRequests = ({ requests, className, addOverride, selectNode }) => {
  return (
    <div className={cn('wmax', className)}>
      <RequestsList
        className="mt3"
        requests={requests}
        onSelect={(request) => {
          request?.isProxied ? selectNode(request.id) : addOverride(request);
        }}
      />
    </div>
  );
};

export default DomainRequests;
