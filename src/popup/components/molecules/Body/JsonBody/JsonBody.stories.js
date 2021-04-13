import React from 'react';

import JsonBody from './JsonBody';

export default {
  title: 'Molecules/ResponseBodies/JsonBody',
  component: JsonBody,
};

const Template = (args) => <JsonBody {...args} className="m4" />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
