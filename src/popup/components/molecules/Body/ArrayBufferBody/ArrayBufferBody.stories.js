import React from 'react';

import ArrayBufferBody from './ArrayBufferBody';

export default {
  title: 'Molecules/ResponseBodies/ArrayBufferBody',
  component: ArrayBufferBody,
};

const Template = (args) => <ArrayBufferBody {...args} className="m4" />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
