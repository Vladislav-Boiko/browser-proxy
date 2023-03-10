import React from 'react';
import Editor from 'react-simple-code-editor';
import {
  highlight,
  languages as prismLanguages,
} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import './PrismInput.css';
const PrismInput = ({ code, language, onChange }) => {
  return (
    <Editor
      value={code}
      onValueChange={(code) => onChange(code)}
      highlight={(code) => hightlightWithLineNumbers(code, language)}
      padding={20}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        // fontSize: 16,
      }}
      tabSize={2}
    />
  );
};

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split('\n')
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n');

export const languages = prismLanguages;
export default PrismInput;
