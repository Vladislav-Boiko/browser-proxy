import React, { useState } from 'react';
import Input from 'atoms/Input/Input';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';
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

import './BlobBody.css';
const BlobBody = ({ blobType, body, onChange, className, ...otherProps }) => {
  const [base64Value, setBase64Value] = useState(body || '');
  const [blobTypeValue, setBlobTypeValue] = useState(blobType || '');
  const updateContent = ({ body, blobType }) => {
    setBase64Value(body);
    setBlobTypeValue(blobType);
    onChange && onChange({ body, blobType });
  };
  return (
    <div className={className}>
      <div className="blob-type">
        <Input
          value={blobTypeValue}
          label="Blob type"
          className="blob-type__input"
          onChange={(value) =>
            updateContent({ body: base64Value, blobType: value })
          }
        />
        <Button
          secondary
          Icon={Icons.Import}
          className="blob-type__upload-button"
        >
          Upload file
        </Button>
      </div>
      <ChunkedInput
        body={base64Value}
        multiline
        {...otherProps}
        label="base64 content"
        className="mt3"
        onChange={(value) =>
          updateContent({ body: value, blobType: blobTypeValue })
        }
        validate={(value) =>
          isValidBase64(value) ? '' : 'Shall be a valid base64'
        }
      />
    </div>
  );
};

export default BlobBody;
