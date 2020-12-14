import React from 'react';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';

import './JsonBody.css';
const JsonBody = ({ body, ...otherProps }) => {
  return <ChunkedInput body={body} multiline {...otherProps} />;
};

export default JsonBody;
