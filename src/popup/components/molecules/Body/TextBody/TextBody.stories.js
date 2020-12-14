import React from 'react';

import TextBody from './TextBody';

export default {
  title: 'Molecules/ResponseBodies/TextBody',
  component: TextBody,
};

const Template = (args) => <TextBody {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
