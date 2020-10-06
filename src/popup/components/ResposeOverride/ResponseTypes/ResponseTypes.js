import React from "react";
import { RESPONSE_TYPES } from "../../../utils/constants";
import ResponseText from "./Text/ResponseText";

const ResponseTypes = (props) => {
  const { type } = props;
  switch (type) {
    case RESPONSE_TYPES.TEXT:
      return <ResponseText {...props} />;
    default:
      return "Unsupported response type";
  }
};

export default ResponseTypes;
