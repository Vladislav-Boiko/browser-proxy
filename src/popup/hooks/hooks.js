import React, { useState, useEffect } from 'react';

export const useInitialState = (initialState) => {
  const [value, setValue] = useState(initialState);
  useEffect(() => {
    setValue(initialState);
  }, [initialState]);

  const reset = () => setValue(initialState);
  const hasChanged = value !== initialState;

  return [value, setValue, hasChanged, reset];
};
