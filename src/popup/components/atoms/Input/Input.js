import React from "react";
import cn from "classnames";
import Label, { LABEL_TYPES, LABEL_SIZES } from "../Label/Label";

import "./Input.css";

const Input = ({
  value,
  className,
  onChange,
  labelType,
  label,
  ...otherProps
}) => {
  return (
    <Label
      className={cn(className, "input__wrapper", {
        input__wrapper_block: labelType === LABEL_TYPES.BLOCK,
        input__wrapper_line:
          labelType === LABEL_TYPES.INLINE || labelType === LABEL_TYPES.HIDDEN,
      })}
      type={labelType}
      label={label}
      size={
        labelType === LABEL_TYPES.BLOCK ? LABEL_SIZES.SMALL : LABEL_SIZES.LARGE
      }
    >
      <input
        className="input"
        type="text"
        {...otherProps}
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      />
    </Label>
  );
};

export default Input;
