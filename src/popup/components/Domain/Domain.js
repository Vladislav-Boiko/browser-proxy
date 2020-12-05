import React, { useState } from 'react';
import DisabledDomain from './views/DisabledDomain';
import EnabledDomain from './views/EnabledDomain';

import './Domain.css';
const Domain = (props) => {
  const { isOn } = props;
  const [isEnabled, setIsEnabled] = useState(isOn);
  const toggle = () => {
    setIsEnabled(!isEnabled);
    props.toggle && props.toggle();
  };
  if (!isEnabled) {
    return <DisabledDomain {...props} enable={toggle} />;
  }
  return <EnabledDomain {...props} toggle={toggle} />;
};

export default Domain;
