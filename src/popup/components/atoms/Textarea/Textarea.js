import React from "react";
import cn from "classnames";
import Label, { LABEL_TYPES } from "../Label/Label";
import "./Textarea.css";

const Textarea = ({ label, labelType, value, onChange, className }) => {
  return (
    <Label
      label={label}
      labelType={labelType}
      className={cn(className, "textarea__wrapper", {
        input__wrapper_block: labelType === LABEL_TYPES.BLOCK,
        input__wrapper_line:
          labelType === LABEL_TYPES.INLINE || labelType === LABEL_TYPES.HIDDEN,
      })}
    >
      <textarea
        value={value}
        className="textarea"
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </Label>
  );
};

export default Textarea;
