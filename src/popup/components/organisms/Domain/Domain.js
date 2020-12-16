import React, { useState } from 'react';
import DisabledDomain from './views/DisabledDomain';
import EnabledDomain from './views/EnabledDomain.container';

import './Domain.css';
const Domain = (props) => {
  const { isOn } = props;
  const toggle = () => {
    props.toggle && props.toggle();
  };
  if (!isOn) {
    return <DisabledDomain {...props} enable={toggle} />;
  }
  return <EnabledDomain {...props} toggle={toggle} />;
};

export default Domain;
