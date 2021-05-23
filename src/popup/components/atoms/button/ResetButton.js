import React from 'react';
import cn from 'classnames';
import Icons from '../Icons/Icons';

import './ResetButton.css';
export const ResetButton = ({ isUnsaved, reset, label, isShifted }) => (
  <label
    title="Undo changes"
    className={cn('reset', {
      reset_enabled: isUnsaved,
      'reset_with-label': !!isShifted,
      reset_active: !!reset,
      reset_disabled: !reset,
    })}
    disabled={!reset}
  >
    <span className="reset_label-text">{label}</span>
    <Icons.Reset className="icon_sm" />
    <button tabIndex={isUnsaved ? 0 : -1} onClick={() => reset && reset()}>
      Revert
    </button>
  </label>
);
