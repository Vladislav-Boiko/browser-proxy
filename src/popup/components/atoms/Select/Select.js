import React, { useState } from "react";
import Label, { LABEL_TYPES } from "../Label/Label";
import cn from "classnames";
import "./Select.css";

export const SELECT_SIZES = {
  SMALL: "SMALL",
  LARGE: "LARGE",
};
const Select = ({
  label,
  labelType,
  options,
  initial,
  onChange,
  size,
  className,
}) => {
  const [value, setValue] = useState(initial);
  const sizeValue = size || SELECT_SIZES.SMALL;
  return (
    <Label type={labelType} label={label} className={cn(className)}>
      <select
        className={cn("select__dropdown", {
          select__dropdown_small: sizeValue === SELECT_SIZES.SMALL,
          select__dropdown_large: sizeValue === SELECT_SIZES.LARGE,
          select__dropdown_block: labelType === LABEL_TYPES.BLOCK,
        })}
        name={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
      >
        {options.map(({ name, value }) => (
          <option value={value}>{name}</option>
        ))}
      </select>
    </Label>
  );
};

export default Select;
