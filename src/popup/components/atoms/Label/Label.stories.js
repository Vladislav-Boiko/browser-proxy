import React from "react";

import Label, { LABEL_TYPES } from "./Label";

export default {
  title: "Label",
  component: Label,
};

const Template = (args) => (
  <Label {...args}>
    <b>Not label</b>
  </Label>
);

export const Story = Template.bind({});
const tree = {
  label: "Label text",
  type: LABEL_TYPES.INLINE,
};
Story.args = tree;
