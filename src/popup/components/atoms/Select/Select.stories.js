import React from "react";

import Select from "./Select";

export default {
  title: "Select",
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Story = Template.bind({});
const tree = {
  label: "SelectName",
  options: [
    { name: "One", value: "1" },
    { name: "Two", value: "2" },
    { name: "Three", value: "3" },
  ],
  initial: 2,
  labelType: "INLINE",
  size: "LARGE",
};
Story.args = tree;
