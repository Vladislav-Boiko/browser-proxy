import React from 'react';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';

import './TextBody.css';
const TextBody = ({ body, ...otherProps }) => {
  return <ChunkedInput body={body} {...otherProps} />;
};

export default TextBody;
