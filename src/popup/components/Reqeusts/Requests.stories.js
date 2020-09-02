import React from "react";

import { Requests } from "./Requests";

export default {
  title: "Requests",
  component: Requests,
};

const Template = (args) => <Requests {...args} />;

export const Story = Template.bind({});
const requests = [
  {
    method: "GET",
    url: "http://yandex.ru",
    status: "200",
    response: '{ "key": "value" }',
  },
  {
    method: "POST",
    url: "http://google.com",
    status: "200",
    response: '[{"test":123},{"nested":{"child":"value"}}]',
  },
  {
    method: "PUT",
    url: "http://amazon.com",
    status: "200",
  },
  {
    method: "DELETE",
    url: "http://netflix.com",
    status: "200",
  },
  {
    method: "OPTIONS",
    url: "http://ibm.com",
    status: "200",
  },
  {
    method: "HEAD",
    url: "http://apple.com",
    status: "200",
  },
  {
    method: "get",
    url:
      "https://public-api.example.com/rest/v1.0/test/wow/such_long_url/event_longer/?param=value",
    status: "200",
  },
];
Story.args = {
  requests,
};
