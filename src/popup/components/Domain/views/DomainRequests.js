import React from 'react';
import cn from 'classnames';
import Button from '../../atoms/Button/Button';
import Icons from '../../atoms/Icons/Icons';
import RequestsList from '../../RequestsList/RequestsList';

import '../Domain.css';
const DomainRequests = ({ requests, className }) => {
  return (
    <div className={cn('domain-requests', className)}>
      <RequestsList className="mt3" requests={requests} />
    </div>
  );
};

export default DomainRequests;
