import React from 'react';

import ArrayBufferBody from './ArrayBufferBody';

export default {
  title: 'Molecules/ResponseBodies/ArrayBufferBody',
  component: ArrayBufferBody,
};

const Template = (args) => <ArrayBufferBody {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
