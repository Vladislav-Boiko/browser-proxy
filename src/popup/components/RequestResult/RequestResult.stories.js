import React from "react";

import RequestResult from "./RequestResult";

export default {
  title: "RequestResult",
  component: RequestResult,
};

const Template = (args) => <RequestResult {...args} />;

export const Story = Template.bind({});
Story.args = {
  response: '{ "key": "value" }',
};
