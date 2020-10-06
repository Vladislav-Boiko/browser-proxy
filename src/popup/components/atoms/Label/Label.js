import React from "react";
import cn from "classnames";
import "./Label.css";

export const LABEL_TYPES = {
  INLINE: "INLINE",
  BLOCK: "BLOCK",
  HIDDEN: "HIDDEN",
};

export const LABEL_SIZES = {
  SMALL: "SMALL",
  LARGE: "LARGE",
};

const Label = ({ label, type, children, className, size }) => {
  const labelType = type || LABEL_TYPES.BLOCK;
  const labelSize = size || LABEL_SIZES.SMALL;
  return (
    <label className={cn("label", className)}>
      <span
        className={cn("label__text", {
          label__text_inline: labelType === LABEL_TYPES.INLINE,
          label__text_hidden: labelType === LABEL_TYPES.HIDDEN,
          label__text_block: labelType === LABEL_TYPES.BLOCK,
          label__text_small: labelSize === LABEL_SIZES.SMALL,
          label__text_large: labelSize === LABEL_SIZES.LARGE,
        })}
      >
        {label}
      </span>
      {children}
    </label>
  );
};

export default Label;
