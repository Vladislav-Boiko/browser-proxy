import React from "react";

import Textarea from "./Textarea";

export default {
  title: "Textarea",
  component: Textarea,
};

const Template = (args) => <Textarea {...args} />;

export const Story = Template.bind({});
const tree = {
  initial: "text",
  label: "Text area label",
  labelType: "BLOCK",
};
Story.args = tree;
