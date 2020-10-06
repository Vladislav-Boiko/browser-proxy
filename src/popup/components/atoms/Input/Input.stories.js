import React from "react";

import Input from "./Input";

export default {
  title: "Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Story = Template.bind({});
const tree = {
  initial: "text",
  label: "Some input",
  labelType: "INLINE",
};
Story.args = tree;
