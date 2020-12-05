import React from 'react';
import Input from '../../../atoms/Input/Input';

import './JsonBody.css';
const JsonBody = ({ body, ...otherProps }) => {
  return <Input value={body} multiline {...otherProps} />;
};

export default JsonBody;
