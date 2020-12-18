import React from 'react';
import cn from 'classnames';
import { ReactComponent as DomainTeaser } from '../DomainTeaser.svg';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';

import '../Domain.css';
const Domain = ({ domainName, enable, className }) => {
  return (
    <div className={cn('disabled-domain', className)}>
      <DomainTeaser className="disabled-domain__teaser" />
      <div className="disabled-domain__content ffc">
        <h2 className="disabled-domain__header">{domainName}</h2>
        <p className="disabled-domain__text g1-color">
          Enable browser proxy for this domain.
        </p>
        <Button
          className="disabled-domain__button mt3"
          primary
          onClick={enable}
          Icon={Icons.Enable}
        >
          Enable
        </Button>
      </div>
    </div>
  );
};

export default Domain;
