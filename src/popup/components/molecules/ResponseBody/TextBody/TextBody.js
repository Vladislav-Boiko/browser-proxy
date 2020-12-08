import React from 'react';
import Input from 'atoms/Input/Input';

import './TextBody.css';
const TextBody = ({ body, ...otherProps }) => {
  return <Input value={body} multiline {...otherProps} />;
};

export default TextBody;
