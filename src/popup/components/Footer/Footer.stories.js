import React from "react";

import Footer from "./Footer";

export default {
  title: "Footer",
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
