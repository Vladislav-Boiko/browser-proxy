import React from 'react';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';

import './JsonBody.css';
import { languages } from '../PrismInput/PrismInput';
const JsonBody = ({ body, ...otherProps }) => {
  return (
    <ChunkedInput
      body={body}
      multiline
      {...otherProps}
      language={languages.js}
    />
  );
};

export default JsonBody;
