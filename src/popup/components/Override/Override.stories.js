import React from "react";

import Override from "./Override";

export default {
  title: "Override",
  component: Override,
};

const Template = (args) => <Override {...args} />;

export const Story = Template.bind({});
Story.args = {
  url: "http://yandex.ru",
  method: "POST",
  response: '{ "key": "value" }',
};
