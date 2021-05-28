import React, { useRef, useState, useEffect } from 'react';
import Icons from 'atoms/Icons/Icons';
import cn from 'classnames';
import SuccessButtonHoc from 'atoms/Button/SuccessButtonHoc';

import './FileInput.css';
const FileInput = ({
  children,
  className,
  onSubmit,
  primary,
  secondary,
  tretiary,
  onClick,
  showSuccess,
  ...otherProps
}) => {
  const ref = useRef();
  const [error, setError] = useState(otherProps.error || '');
  useEffect(() => {
    setError(otherProps.error || '');
  }, [otherProps.error]);
  const submit = (file) => {
    if (onSubmit && file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        fileReader.result && onSubmit && onSubmit(fileReader.result);
        showSuccess && showSuccess();
      };
      fileReader.onerror = () => {
        setError(fileReader.error);
      };
      fileReader.readAsText(file);
      return true;
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
        <Icons.Import
          className={cn('icon_md mr1', otherProps.iconClass)}
        ></Icons.Import>
        {children}
        <input
          type="file"
          className="file-input"
          ref={ref}
          onChange={(e) => {
            submit(e.target.files[0]);
            e.target.value = '';
          }}
        />
      </label>
      {error && <p className="file-input__error">{error}</p>}
    </div>
  );
};

export default SuccessButtonHoc(FileInput);
