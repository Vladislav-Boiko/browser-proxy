import React from "react";

import InlineOverride from "./InlineOverride";

export default {
  title: "InlineOverride",
  component: InlineOverride,
};

const Template = (args) => <InlineOverride {...args} />;

export const Story = Template.bind({});
Story.args = {
  url: "http://yandex.ru",
  method: "POST",
  response: '{ "key": "value" }',
};
