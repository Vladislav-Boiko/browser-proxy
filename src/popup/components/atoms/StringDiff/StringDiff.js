import React from 'react';

import './StringDiff.css';
const StringDiff = ({ left, right }) => {
  const toRenderChunks = [];
  let currentChunk = { value: '', isSame: true };
  left.split('').map((key, position) => {
    if (currentChunk.isSame && key === right[position]) {
      currentChunk.value += key;
    } else if (!currentChunk.isSame && key !== right[position]) {
      currentChunk.value += key;
    } else {
      toRenderChunks.push(currentChunk);
      currentChunk = { value: key, isSame: key === right[position] };
    }
    return '';
  });
  toRenderChunks.push(currentChunk);
  return toRenderChunks
    .filter((chunk) => chunk.value)
    .map((chunk, i) => (
      <span
        key={i}
        className={chunk.isSame ? 'string-diff_same' : 'string-diff_differ'}
      >
        {chunk.value}
      </span>
    ));
};

export default StringDiff;
