import React, { useState } from 'react';
import cn from 'classnames';
import Input from 'atoms/Input/Input';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';

const isValidBase64 = (value) => {
  try {
    atob(value);
    return true;
  } catch (e) {
    return false;
  }
};

import './ArrayBufferBody.css';
const ArrayBufferBody = ({ body, onChange, className, ...otherProps }) => {
  const [base64Value, setBase64Value] = useState(body || '');
  const updateContent = (body) => {
    setBase64Value(body);
    onChange && onChange(body);
  };
  return (
    <div className={cn(className, 'mt6')}>
      <div className="array-buffer-header">
        <Button secondary icon={Icons.upload}>
          Upload file
        </Button>
      </div>
      <Input
        value={base64Value}
        multiline
        {...otherProps}
        label="base64 content"
        className="mt3"
        onChange={updateContent}
        validate={(value) =>
          isValidBase64(value) ? '' : 'Shall be a valid base64'
        }
      />
    </div>
  );
};

export default ArrayBufferBody;
