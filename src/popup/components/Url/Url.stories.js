import React from "react";

import Url from "./Url";

export default {
  title: "Url",
  component: Url,
};

const Template = (args) => <Url {...args} />;

export const Story = Template.bind({});
const tree = { url: "test" };
Story.args = tree;
