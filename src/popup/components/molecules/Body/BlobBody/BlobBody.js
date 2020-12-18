import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import ChunkedInput from 'molecules/ChunkedInput/ChunkedInput';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import './BlobBody.css';

const isValidBase64 = (value) => {
  try {
    atob(value);
    return true;
  } catch (e) {
    return false;
  }
};

const BlobBody = ({ blobType, body, onChange, className, ...otherProps }) => {
  const [blobTypeValue, setBlobTypeValue] = useState(blobType || '');
  useEffect(() => {
    setBlobTypeValue(blobType || '');
  }, [blobType]);
  const updateContent = ({ body, blobType }) => {
    setBlobTypeValue(blobType);
    onChange && onChange({ body, blobType });
  };
  return (
    <div className={className}>
      <div className="blob-type ffr">
        <Input
          value={blobTypeValue}
          label="Blob type"
          className="blob-type__input"
          onChange={(value) => updateContent({ body, blobType: value })}
          isUnsaved={blobType !== blobTypeValue}
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
        multiline
        body={body}
        {...otherProps}
        label="base64 content"
        className="mt3"
        onChange={(value) =>
          updateContent({ body: value, blobType: blobTypeValue })
        }
        validate={(value) =>
          isValidBase64(value) ? '' : 'Is not a valid base64'
        }
      />
    </div>
  );
};

export default BlobBody;
