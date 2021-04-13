import React from 'react';

import Url from './Url';

export default {
  title: 'Molecules/Url',
  component: Url,
};

const Template = (args) => <Url {...args} className="m4" />;

export const Story = Template.bind({});
const tree = { url: 'test' };
Story.args = tree;
