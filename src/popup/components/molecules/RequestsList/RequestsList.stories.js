import { TYPES } from 'atoms/ResponseType/ResponseType';
import React from 'react';

import RequestsList from './RequestsList';

export default {
  title: 'Molecules/RequestsList',
  component: RequestsList,
};

const Template = (args) => <RequestsList {...args} className="m4" />;

export const Story = Template.bind({});
const requests = [
  {
    method: 'GET',
    url: 'http://yandex.ru',
    responseCode: '200',
    responseType: TYPES.JSON,
    isProxied: true,
    id: 'test',
  },
  {
    method: 'POST',
    url: 'http://google.com',
    responseCode: '500',
    responseType: TYPES.BLOB,
  },
  {
    method: 'PUT',
    url: 'http://amazon.com',
    responseCode: '404',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'DELETE',
    url: 'http://netflix.com',
    responseCode: '301',
    responseType: TYPES.TEXT,
  },
  {
    method: 'OPTIONS',
    url: 'http://ibm.com',
    responseCode: '200',
    responseType: TYPES.JSON,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
  {
    method: 'HEAD',
    url: 'http://apple.com/something/verey/very/long/user?abc=def',
    responseCode: '200',
    responseType: TYPES.ARRAY_BUFFER,
  },
];
Story.args = {
  requests,
};
