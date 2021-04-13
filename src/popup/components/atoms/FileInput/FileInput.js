import React, { useRef, useState } from 'react';
import Icons from 'atoms/Icons/Icons';
import cn from 'classnames';

import './FileInput.css';
const FileInput = ({
  children,
  className,
  onSubmit,
  primary,
  secondary,
  tretiary,
}) => {
  const ref = useRef();
  const [error, setError] = useState('');
  const submit = (file) => {
    if (file.type !== 'application/json') {
      setError('Cannot import non json file.');
    }
    if (onSubmit && file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          let asJson = JSON.parse(fileReader.result);
          if (!Array.isArray(asJson)) {
            asJson = [asJson];
          }
          fileReader.result && onSubmit(asJson);
        } catch (e) {
          setError('File contents could not been parsed as json');
        }
      };
      fileReader.onerror = () => {
        setError(fileReader.error);
      };
      fileReader.readAsText(file);
    }
  };
  return (
    <div className={cn('file-input-component', className)}>
      <label
        className={cn('file-input button label_medium py1 px3', {
          'primary white-color primary-bg': primary,
          'secondary white-bg primary-color': secondary,
          'tretiary white-bg primary-color': tretiary,
        })}
      >
        <Icons.Import className={cn('icon_md mr1')}></Icons.Import>
        {children}
        <input
          type="file"
          className="file-input"
          ref={ref}
          onChange={(e) => submit(e.target.files[0])}
        />
      </label>
      {error && <p className="file-input__error">{error}</p>}
    </div>
  );
};

export default FileInput;
