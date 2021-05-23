import React from 'react';
import Highlighter from 'react-highlight-words';

export default (text = '', searchRegexp) =>
  searchRegexp && typeof text === 'string' ? (
    <Highlighter
      searchWords={[searchRegexp]}
      textToHighlight={text}
    ></Highlighter>
  ) : (
    text
  );
