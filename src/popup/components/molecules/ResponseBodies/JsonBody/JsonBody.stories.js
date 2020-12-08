import React from 'react';

import JsonBody from './JsonBody';

export default {
  title: 'Molecules/ResponseBodies/JsonBody',
  component: JsonBody,
};

const Template = (args) => <JsonBody {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
