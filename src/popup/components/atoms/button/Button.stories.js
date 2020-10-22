import React from "react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => <Button {...args} >Some test button</Button>;

export const Story = Template.bind({});
const props = {};
Story.args = props;
