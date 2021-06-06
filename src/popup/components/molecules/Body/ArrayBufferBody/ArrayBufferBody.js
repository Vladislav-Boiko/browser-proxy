import React, { useState } from 'react';
import cn from 'classnames';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';
import FileInput from 'atoms/FileInput/FileInput';
import './ArrayBufferBody.css';

const isValidBase64 = (value) => {
  try {
    atob(value);
    return true;
  } catch (e) {
    return false;
  }
};

const ArrayBufferBody = ({ body, onChange, className, ...otherProps }) => {
  const [base64Value, setBase64Value] = useState(body || '');
  const updateContent = (body) => {
    setBase64Value(body);
    onChange && onChange(body);
  };
  const onUpload = (file) => {
    const encoded = btoa(unescape(encodeURIComponent(file)));
    updateContent([{ value: encoded, delay: 200 }]);
  };
  return (
    <div className={cn(className, 'mt6')}>
      <div className="array-buffer-header">
        <FileInput secondary onSubmit={onUpload}>
          Upload file
        </FileInput>
      </div>
      <ChunkedInput
        body={base64Value}
        multiline
        {...otherProps}
        label="base64 content"
        className="mt3"
        onChange={updateContent}
        type="ArrayBuffer"
        validate={(value) =>
          isValidBase64(value) ? '' : 'Is not a valid base64'
        }
      />
    </div>
  );
};

export default ArrayBufferBody;
