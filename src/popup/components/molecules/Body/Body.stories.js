import React from 'react';

import Body from './Body';

export default {
  title: 'Molecules/Body',
  component: Body,
};

const Template = (args) => <Body {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
