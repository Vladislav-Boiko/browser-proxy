import React from 'react';

import BlobBody from './BlobBody';

export default {
  title: 'Molecules/ResponseBodies/BlobBody',
  component: BlobBody,
};

const Template = (args) => <BlobBody {...args} />;

export const Story = Template.bind({});
const tree = {};
Story.args = tree;
