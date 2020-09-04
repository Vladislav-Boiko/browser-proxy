import React from "react";

import RequestContent from "./RequestContent";

export default {
  title: "RequestContent",
  component: RequestContent,
};

const Template = (args) => <RequestContent {...args} />;

export const Story = Template.bind({});
Story.args = {
  response: '{ "key": "value" }',
};
