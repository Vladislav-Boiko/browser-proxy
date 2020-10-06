import React from "react";

import ResponseOverride from "./ResponseOverride";

export default {
  title: "ResponseOverride",
  component: ResponseOverride,
};

const Template = (args) => <ResponseOverride {...args} />;

export const Story = Template.bind({});
const tree = { value: "test", type: "TEXT" };
Story.args = tree;
