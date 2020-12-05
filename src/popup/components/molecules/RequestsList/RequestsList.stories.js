import React from 'react';

import RequestsList from './RequestsList';

export default {
  title: 'Molecules/RequestsList',
  component: RequestsList,
};

const Template = (args) => <RequestsList {...args} />;

export const Story = Template.bind({});
const requests = [
  {
    method: 'GET',
    url: 'http://yandex.ru',
    code: '200',
    responseType: 'JSON',
  },
  {
    method: 'POST',
    url: 'http://google.com',
    code: '200',
    responseType: 'BLOB',
  },
  {
    method: 'PUT',
    url: 'http://amazon.com',
    code: '200',
    responseType: 'ArrayBuffer',
  },
  {
    method: 'DELETE',
    url: 'http://netflix.com',
    code: '200',
    responseType: 'TEXT',
  },
  {
    method: 'OPTIONS',
    url: 'http://ibm.com',
    code: '200',
    responseType: 'JSON',
  },
  {
    method: 'HEAD',
    url: 'http://apple.com',
    code: '200',
    responseType: 'ArrayBuffer',
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    code: '200',
    responseType: 'ArrayBuffer',
  },
];
Story.args = {
  requests,
};
