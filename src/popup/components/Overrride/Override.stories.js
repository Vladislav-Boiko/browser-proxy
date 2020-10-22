import React from "react";

import { Override } from "./Override";

export default {
  title: "Override",
  component: Override,
};

const Template = (args) => <Override {...args} />;

export const Story = Template.bind({});
const props = { 
  override: {
    url: "https://github.com/",
    method: "POST",
    response: {
      value: "test response value",
      type: "JSON",
      code: 202
    }
  }
};
Story.args = props;
