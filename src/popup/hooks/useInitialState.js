import { useState, useRef } from 'react';
import isEqual from 'deep-equal';

export const useInitialState = (initialState) => {
  const [state, setState] = useState(initialState);
  const initialStateRef = useRef(initialState);
  const revertStateRef = useRef(() => {
    setState(initialStateRef.current);
    return initialStateRef.current;
  });

  return {
    value: state,
    onChange: setState,
    isUnsaved: !isEqual(initialStateRef.current, state),
    reset: revertStateRef.current,
  };
};
