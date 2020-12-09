import React from 'react';

import HeadersList from './HeadersList';

export default {
  title: 'Molecules/HeadersList',
  component: HeadersList,
};

const Template = (args) => <HeadersList {...args} />;

export const Story = Template.bind({});
const tree = {
  headers: [
    {
      name: 'Some header name',
      value: 'Some value',
    },
    {
      name: 'Connection',
      value: 'Keep alive',
    },
    {
      name: 'x-xss',
      value: '1; mode=block',
    },
  ],
};
Story.args = tree;
