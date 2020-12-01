import React from 'react';
import cn from 'classnames';
import { ReactComponent as DomainTeaser } from './DomainTeaser.svg';
import Button from '../atoms/button/Button';
import Icons from '../atoms/Icons/Icons';
import Header from '../Header/Header';

import './Domain.css';
const Domain = ({ domainName, enable, className }) => {
  return (
    <React.Fragment>
      <Header options={[{ name: 'requests' }, { name: 'settings' }]} />
    </React.Fragment>
  );
};

export default Domain;
