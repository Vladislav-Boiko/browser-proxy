import React, { useState } from "react";
import cn from "classnames";
import Textarea from "../../../atoms/Textarea/Textarea";
import { LABEL_TYPES } from "../../../atoms/Label/Label";

import "./ResponseText.css";
const ResponseText = ({ value, className, onChange }) => {
  const [text, setText] = useState(value || "");
  return (
    <Textarea
      label="Override response text"
      labelType={LABEL_TYPES.BLOCK}
      value={text}
      className={cn("response-text__input", className)}
      onChange={(value) => {
        setText(value);
        onChange(value);
      }}
    />
  );
};

export default ResponseText;
