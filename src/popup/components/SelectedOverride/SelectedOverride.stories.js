import React from "react";

import { SelectedOverride } from "./SelectedOverride";

export default {
  title: "Selected Override",
  component: SelectedOverride,
};

const Template = (args) => <SelectedOverride {...args} />;

export const Story = Template.bind({});
const tree = {
  navItem: { id: "mockId" },
  save: () => {},
  remove: () => {},
  override: {
    response: { code: 300, type: "TEXT", value: "Hello world!" },
  },
};
Story.args = tree;
