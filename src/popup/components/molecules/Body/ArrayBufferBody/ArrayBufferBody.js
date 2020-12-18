import React, { useState } from 'react';
import cn from 'classnames';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
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
  return (
    <div className={cn(className, 'mt6')}>
      <div className="array-buffer-header">
        <Button secondary Icon={Icons.Import}>
          Upload file
        </Button>
      </div>
      <ChunkedInput
        body={base64Value}
        multiline
        {...otherProps}
        label="base64 content"
        className="mt3"
        onChange={updateContent}
        validate={(value) =>
          isValidBase64(value) ? '' : 'Is not a valid base64'
        }
      />
    </div>
  );
};

export default ArrayBufferBody;
