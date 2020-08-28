import React from "react";

import Request from "./Request";

export default {
  title: "Request",
  component: Request,
};

const Template = (args) => <Request {...args} />;

export const Story = Template.bind({});
Story.args = {
  method: "GET",
  url: "http://yandex.ru",
  status: "200",
};
