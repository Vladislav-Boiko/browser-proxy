import { useState, useEffect } from 'react';
import isEqual from 'deep-equal';

export const useInitialState = (initialState, deps = []) => {
  const [value, setValue] = useState(initialState);
  useEffect(() => {
    setValue(initialState);
  }, [initialState, ...deps]);

  const reset = () => setValue(initialState);
  const hasChanged = !isEqual(value, initialState);

  return [value, setValue, hasChanged, reset];
};
