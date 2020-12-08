import React from 'react';

import ResponseBody from './ResponseBody';

export default {
  title: 'Molecules/ResponseBodies/ResponseBody',
  component: ResponseBody,
};

const Template = (args) => <ResponseBody {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
