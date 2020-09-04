import React from "react";

import RequestHeader from "./RequestHeader";

export default {
  title: "RequestHeader",
  component: RequestHeader,
};

const Template = (args) => <RequestHeader {...args} />;

export const Story = Template.bind({});
Story.args = {
  method: "GET",
  url: "http://yandex.ru",
  status: "200",
};
